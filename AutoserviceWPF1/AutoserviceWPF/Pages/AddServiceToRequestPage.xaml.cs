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

        private void AddService_Click(object sender, RoutedEventArgs e)
        {
            //TODO: Добавить TextBox для ввода времени услуги.
            _listService = new ListService() { ServiceId = ((Service)ServicesListView.SelectedItem).Id, Service = (Service)ServicesListView.SelectedItem, PriceId = ((Service)ServicesListView.SelectedItem).PriceId };
            _listServices.Add(_listService);
            ServicesToRequestListView.Items.Add(_listService);
        }

        private void DeleteService_Click(object sender, RoutedEventArgs e)
        {   
            ListService currentListService = (ListService)ServicesToRequestListView.SelectedItem;
            _listServices.Remove(currentListService);
            ServicesToRequestListView.Items.Remove(currentListService);
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
    }
}
