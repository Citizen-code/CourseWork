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
    /// Логика взаимодействия для AddServiceToRequestPage.xaml
    /// </summary>
    public partial class AddServiceToRequestPage : Page
    {
        private readonly Order _order;
        private readonly Service _service;
        public ListService _listService = new ListService();
        public List<ListService> _listServices = new List<ListService>();

        int page = 1;
        int pagesCount = 1;

        public AddServiceToRequestPage(Order order)
        {
            InitializeComponent();
            _order = order;
            ServicesListView.DataContext = _service;
            ServicesToRequestListView.DataContext = _listService;
        }

        private async void LoadServices()
        {
            try
            {
                ServicesListView.ItemsSource = null;
                int pages = (await ApiRestClient.Api.Services.GetCountServices()).CountPages;
                if (pagesCount != pages)
                {
                    for (int i = 1; i < pages + 1; i++)
                    {
                        Pagination.Items.Add(i);
                    }
                }
                pagesCount = pages;
                ServicesListView.ItemsSource = await ApiRestClient.Api.Services.GetServices(false, true, page, true);
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

        private void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                NavigationService.Navigate(new AddPartToRequest(_order, _listServices));
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
                    LoadServices();
                }
            }
        }

        private void Page_Loaded(object sender, RoutedEventArgs e)
        {
            try
            {
                LoadServices();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Ошибка", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                _listService = new ListService() { ServiceId = ((Service)ServicesListView.SelectedItem).Id, Service = (Service)ServicesListView.SelectedItem, PriceId = ((Service)ServicesListView.SelectedItem).PriceId };
                if (_listService.Service.Price.IsTimeBased == true)
                {
                    if (String.IsNullOrEmpty(TimeTextBox.Text))
                    {
                        throw new Exception("Введите время выполнения услуги.");
                    }
                    if (!decimal.TryParse(TimeTextBox.Text, out Decimal number))
                    {
                        throw new Exception("Необходимо ввести число !");
                    }
                    _listService.Time = Convert.ToDecimal(TimeTextBox.Text);
                }
                _listServices.Add(_listService);
                ServicesToRequestListView.Items.Add(_listService);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Ошибка", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void ServicesListView_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            try
            {
                if (ServicesListView.SelectedItem != null)
                {
                    AddButton.IsEnabled = true;
                    Service currentService = (Service)ServicesListView.SelectedItem;
                    switch (currentService.Price.IsTimeBased)
                    {
                        case true:
                            TimeTextBox.Visibility = Visibility.Visible;
                            break;
                        case false:
                            TimeTextBox.Visibility = Visibility.Collapsed;
                            break;
                    }
                }
                else
                {
                    AddButton.IsEnabled = false;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Ошибка", MessageBoxButton.OK, MessageBoxImage.Error);

            }
        }

        private void ServicesToRequestListView_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            try
            {
                ListService currentListService = (ListService)ServicesToRequestListView.SelectedItem;
                _listServices.Remove(currentListService);
                ServicesToRequestListView.Items.Remove(currentListService);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Ошибка", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
