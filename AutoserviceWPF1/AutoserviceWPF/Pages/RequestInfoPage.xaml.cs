using AutoserviceWPF.Models;
using AutoserviceWPF.Models.ModelsDB;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Xceed.Words.NET;

namespace AutoserviceWPF.Pages
{
    /// <summary>
    /// Логика взаимодействия для RequestInfoPage.xaml
    /// </summary>
    public partial class RequestInfoPage : Page
    {
        private readonly Order _order;
        private readonly ListService _listService;
        private readonly ListConsumablePart _listPart;
        public RequestInfoPage(Order order)
        {
            InitializeComponent();
            _order = order;
            ServicesToRequestListView.DataContext = _listService;
            PartsToRequestListView.DataContext = _listPart;
            switch (order.Status.Id)
            {
                case 1:
                    PrintButton.Visibility = Visibility.Visible;
                    break;
                case 2: 
                    PrintButton.Visibility = Visibility.Collapsed;
                    break;
            }
        }

        private void LoadServices()
        {
            try
            {
                ServicesToRequestListView.ItemsSource = null;
                ServicesToRequestListView.ItemsSource = _order.ListServices;
            }
            catch (Exception ex) when (ex is ApiError error)
            {
                if (error.Error.Errors.Count > 0)
                {
                    string errorList = string.Join("\n", error.Error.Errors);
                    MessageBox.Show(errorList, error.Message, MessageBoxButton.OK, MessageBoxImage.Error);
                }
                else
                {
                    MessageBox.Show(error.Message, "Ошибка", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Ошибка", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        public void LoadParts()
        {
            try
            {
                PartsToRequestListView.ItemsSource = null;
                PartsToRequestListView.ItemsSource = _order.ListConsumableParts;
            }
            catch (Exception ex) when (ex is ApiError error)
            {
                if (error.Error.Errors.Count > 0)
                {
                    string errorList = string.Join("\n", error.Error.Errors);
                    MessageBox.Show(errorList, error.Message, MessageBoxButton.OK, MessageBoxImage.Error);
                }
                else
                {
                    MessageBox.Show(error.Message, "Ошибка", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Ошибка", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            NavigationService.GoBack();
        }

        private void Page_Loaded(object sender, RoutedEventArgs e)
        {
            try
            {
                LoadServices();
                LoadParts();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Ошибка", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        public void PrintQueue(Order order)
        {
            try
            {
                decimal service_price = 0;
                decimal parts_price = 0;
                foreach (var item in order.ListServices) service_price += (bool)item.Price.IsTimeBased ? item.Price.Price * item.Time : item.Price.Price;
                foreach (var item in order.ListConsumableParts) parts_price += item.ConsumablePart.Price;
                DocX doc = DocX.Load(new FileInfo("..//..//Resources//Template.docx").FullName);
                doc.ReplaceText("{0}", $"{order.Id}");
                doc.ReplaceText("{1}", $"{order.Client.Surname} {order.Client.Firstname[0]}. {order.Client.Lastname[0]}");
                doc.ReplaceText("{2}", $"{order.Client.Email}");
                doc.ReplaceText("{3}", $"{order.Client.Car.Name }");
                doc.ReplaceText("{4}", $"{order.Client.Car.ReleaseYear}");
                doc.ReplaceText("{5}", $"{order.Client.Car.Mileage ?? "Не указано"}");
                doc.ReplaceText("{6}", $"{order.Client.Car.Number ?? "Не указано"}");
                doc.ReplaceText("{7}", $"{order.Client.Car.Vin ?? "Не указано"}");
                doc.ReplaceText("{8}", $"{order.Client.Car.Engine.Name ?? "Не указано"}");
                doc.ReplaceText("{9}", $"{order.Client.Car.Color ?? "Не указано"}");
                doc.ReplaceText("{10}", $"{service_price}");
                doc.ReplaceText("{11}", $"{parts_price}");
                doc.ReplaceText("{12}", $"{(service_price + parts_price)}");
                doc.ReplaceText("{13}", $"{order.Date}");
                var tb_service = doc.Tables[2];
                int index = 2;
                foreach (var item in order.ListServices)
                {
                    tb_service.InsertRow(index);
                    tb_service.Rows[index].Cells[0].Paragraphs.First().Append($"{index - 1}");
                    tb_service.Rows[index].Cells[1].Paragraphs.First().Append($"{item.Service.Name}");
                    if ((bool)item.Price.IsTimeBased)
                    {
                        tb_service.Rows[index].Cells[2].Paragraphs.First().Append($"{item.Price.Price}");
                        tb_service.Rows[index].Cells[3].Paragraphs.First().Append($"{item.Time}");
                        tb_service.Rows[index].Cells[5].Paragraphs.First().Append($"{(item.Price.Price * item.Time)}");
                    }
                    else
                    {
                        tb_service.Rows[index].Cells[4].Paragraphs.First().Append($"{item.Price.Price}");
                        tb_service.Rows[index].Cells[5].Paragraphs.First().Append($"{(item.Price.Price)}");
                    }
                    index++;
                }
                tb_service.Rows.Last().Cells[1].Paragraphs.First().Append($"{service_price}");
                var tb_parts = doc.Tables[3];
                index = 2;
                decimal parts_count_all = 0;
                foreach (var item in order.ListConsumableParts.GroupBy(x => x.ConsumablePartId).Select(x => x.FirstOrDefault()))
                {
                    var count = order.ListConsumableParts.Count(i => i.ConsumablePartId == item.ConsumablePartId);

                    tb_parts.InsertRow(index);
                    parts_count_all += count;
                    tb_parts.Rows[index].Cells[0].Paragraphs.First().Append($"{index - 1}");
                    tb_parts.Rows[index].Cells[1].Paragraphs.First().Append($"{item.ConsumablePart.Name}");
                    tb_parts.Rows[index].Cells[2].Paragraphs.First().Append($"{item.ConsumablePart.MeasureUnit}");
                    tb_parts.Rows[index].Cells[3].Paragraphs.First().Append($"{count}");
                    tb_parts.Rows[index].Cells[4].Paragraphs.First().Append($"{item.ConsumablePart.Price}");
                    tb_parts.Rows[index].Cells[5].Paragraphs.First().Append($"{item.ConsumablePart.Price}");
                    index++;
                }
                tb_parts.Rows.Last().Cells[1].Paragraphs.First().Append($"{parts_count_all}");
                tb_parts.Rows.Last().Cells[3].Paragraphs.First().Append($"{parts_price}");
                var dialog = new SaveFileDialog();
                dialog.Filter = "Directory | directory";
                var result = dialog.ShowDialog();
                if (result != true)
                    return;
                string filename = dialog.FileName;
                var name = filename.Split('\\').Last();
                filename = filename.Replace(name, "");
                doc.SaveAs(filename + $"№{order.Id}");
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Ошибка", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void PrintButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                PrintQueue(_order);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Ошибка", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
