using AutoserviceWPF.Models;
using AutoserviceWPF.Models.ModelsDB;
using System;
using System.Collections.Generic;
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

namespace AutoserviceWPF.Pages
{
    /// <summary>
    /// Логика взаимодействия для AddPartToRequest.xaml
    /// </summary>
    public partial class AddPartToRequest : Page
    {
        private readonly Order _order;
        private readonly List<ListService> _listServices;
        private readonly ConsumablePart _part;
        public ListConsumablePart _listPart = new ListConsumablePart();
        public List<ListConsumablePart> _listParts = new List<ListConsumablePart>();

        int page = 1;
        int pagesCount = 1;

        public AddPartToRequest(Order order, List<ListService> listServices)
        {
            InitializeComponent();
            _order = order;         
            _listServices = listServices;
            PartsListView.DataContext = _part;
            PartsToRequestListView.DataContext = _listPart;
        }

        public async void LoadParts()
        {
            try
            {
                PartsListView.ItemsSource = null;
                int pages = (await ApiRestClient.Api.ConsumableParts.GetCountConsumableParts()).CountPages;
                if (pagesCount != pages)
                {
                    for (int i = 1; i < pages + 1; i++)
                    {
                        Pagination.Items.Add(i);
                    }
                }
                pagesCount = pages;
                PartsListView.ItemsSource = await ApiRestClient.Api.ConsumableParts.GetConsumableParts(true, true, page);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Ошибка", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }


        private void AddPart_Click(object sender, RoutedEventArgs e)
        {
            _listPart = new ListConsumablePart() { ConsumablePartId = ((ConsumablePart)PartsListView.SelectedItem).Id, ConsumablePart = (ConsumablePart)PartsListView.SelectedItem };
            _listParts.Add(_listPart);
            PartsToRequestListView.Items.Add(_listPart);
        }

        private void DeletePart_Click(object sender, RoutedEventArgs e)
        {
            ListConsumablePart currentListConsumablePart = (ListConsumablePart)PartsToRequestListView.SelectedItem;
            _listParts.Remove(currentListConsumablePart);
            PartsToRequestListView.Items.Remove(currentListConsumablePart);
        }

        private async void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                await ApiRestClient.Api.Orders.AddContentOrder(_order.Id, _listServices, _listParts);
                MessageBox.Show($"{_listServices.Count}", "test");
                MessageBox.Show($"{_listParts.Count}", "test");
                NavigationService.Navigate(new RequestsPage());
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

        private void ScrollViewer_PreviewMouseWheel(object sender, MouseWheelEventArgs e)
        {
            ScrollViewer scrollViewer = (ScrollViewer)sender;
            if (e.Delta < 0)
            {
                scrollViewer.LineRight();
            }
            else
            {
                scrollViewer.LineLeft();
            }
            e.Handled = true;
        }

        private void Pagination_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (Pagination.SelectedItem != null)
            {
                if (page != (int)Pagination.SelectedItem)
                {
                    page = (int)Pagination.SelectedItem;
                    LoadParts();
                }
            }
        }

        private void Page_Loaded(object sender, RoutedEventArgs e)
        {
            try
            {
                LoadParts();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Ошибка", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
