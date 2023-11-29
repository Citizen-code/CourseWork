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
using static AutoserviceWPF.Models.ApiRestClient;

namespace AutoserviceWPF.Pages
{
    /// <summary>
    /// Логика взаимодействия для RequestsPage.xaml
    /// </summary>
    public partial class RequestsPage : Page
    {
        private readonly Order _order;

        int page = 1;
        OrderType sortSelect = OrderType.None;
        int pagesCount = 1;

        public RequestsPage()
        {
            InitializeComponent();
        }

        private async void LoadRequests()
        {
            try
            {
                var status = new List<int>();
                if(CancelCheckBox.IsChecked == true) status.Add(4);
                if(FinallyCheckBox.IsChecked == true) status.Add(1);
                if (ActiveCheckBox.IsChecked == true) status.Add(2);

                RequestsListView.ItemsSource = null;
                int pages = (await ApiRestClient.Api.Orders.GetCountOrders(findText: SearchTextBox.Text, sort: sortSelect, status: status)).CountPages;
                if (pages < page) page = pages == 0 ? 1 : pages;
                Pagination.Items.Clear();
                for (int i = page > 5 ? page - 5 : 1; i <= (((page + 5) < pages) ? page + 5 : pages); i++)
                {
                    Pagination.Items.Add(i);
                }
                pagesCount = pages;
                RequestsListView.ItemsSource = await ApiRestClient.Api.Orders.GetOrders(pagination: true, page: page, include: true, findText: SearchTextBox.Text, sort: sortSelect, status: status);
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

        private void Pagination_Selected(object sender, RoutedEventArgs e)
        {
            if (Pagination.SelectedItem != null)
            {
                if (page != (int)Pagination.SelectedItem)
                {
                    page = (int)Pagination.SelectedItem;
                    LoadRequests();
                }
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

        private void ServicesNavigationItem_PreviewMouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            NavigationService.Navigate(new ServicesPage());
        }

        private void ClientsNavigationItem_PreviewMouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            NavigationService.Navigate(new ClientsPage());
        }

        private void PartsNavigationItem_PreviewMouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            NavigationService.Navigate(new PartsPage());
        }

        private void ExitButton_Click(object sender, RoutedEventArgs e)
        {
            NavigationService.Navigate(new AuthPage());
        }

        private void Page_Loaded(object sender, RoutedEventArgs e)
        {
            try
            {
                LoadRequests();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message,"Ошибка", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void AddServiceToRequest_Click(object sender, RoutedEventArgs e)
        {
            if (RequestsListView.SelectedItem != null)
            {
                Order currentOrder = (Order)RequestsListView.SelectedItem;
                NavigationService.Navigate(new AddServiceToRequestPage(currentOrder));
            }
            else
            {
                return;
            }
        }

        private void CheckBox_Checked(object sender, RoutedEventArgs e)
        {
            LoadRequests();
        }

        public async Task<bool> InputEnd(TextBox textBox)
        {
            var text = textBox.Text;
            await Task.Delay(500);
            return text == textBox.Text;

        }

        private async void SearchTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            if (await InputEnd(SearchTextBox))
            {
                LoadRequests();
            }
        }

        private void AscendingRadioButton_Checked(object sender, RoutedEventArgs e)
        {
            sortSelect = OrderType.Ascending;
            LoadRequests();
        }

        private void DescendingRadioButton_Checked(object sender, RoutedEventArgs e)
        {
            sortSelect = OrderType.Descending;
            LoadRequests();
        }

        private void RequestInfo_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (RequestsListView.SelectedItem != null)
            {
                Order currentOrder = (Order)RequestsListView.SelectedItem;
                NavigationService.Navigate(new RequestInfoPage(currentOrder));
            }
            else
            {
                return;
            }
        }

        private void LoadData_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            try
            {
                SearchTextBox.Text = null;
                CancelCheckBox.IsChecked = false;
                FinallyCheckBox.IsChecked = false;
                ActiveCheckBox.IsChecked = false;
                DateAscendingRadioButton.IsChecked = false;
                DateDescendingRadioButton.IsChecked = false;
                LoadRequests();
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
    }
}
