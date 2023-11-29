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
    /// Логика взаимодействия для ClientsPage.xaml
    /// </summary>
    public partial class ClientsPage : Page
    {
        int page = 1;
        OrderType sortSelect = OrderType.None;
        int pagesCount = 1;

        public ClientsPage()
        {
            InitializeComponent();
        }

        public async void LoadClients()
        {
            try
            {
                ClientList.ItemsSource = null;
                int pages = (await ApiRestClient.Api.Client.GetCountClients(findText: SearchTextBox.Text, sort: sortSelect)).CountPages;
                if (pages < page) page = pages==0?1:pages;
                Pagination.Items.Clear();
                for (int i = page > 5 ? page - 5 : 1; i <= (((page + 5) < pages) ? page + 5 : pages); i++)
                {
                    Pagination.Items.Add(i);
                }
                pagesCount = pages;
                ClientList.ItemsSource = await ApiRestClient.Api.Client.GetClients(true, true, page, findText: SearchTextBox.Text, sort: sortSelect);
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
                    LoadClients();
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

        private void Page_Loaded(object sender, RoutedEventArgs e)
        {
            try
            {
                LoadClients();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Ошибка", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void RequestsNavigationItem_PreviewMouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            NavigationService.Navigate(new RequestsPage());
        }

        private void ServicesNavigationItem_PreviewMouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            NavigationService.Navigate(new ServicesPage());
        }

        private void PartsNavigationItem_PreviewMouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            NavigationService.Navigate(new PartsPage());
        }

        private void ExitButton_Click(object sender, RoutedEventArgs e)
        {
            NavigationService.Navigate(new AuthPage());
        }

        private void UpdateClient_Click(object sender, RoutedEventArgs e)
        {
            if (ClientList.SelectedItem != null)
            {
                Client currentClient = (Client)ClientList.SelectedItem;
                NavigationService.Navigate(new CarUpdatePage(currentClient));
            }
            else
            {
                return;
            }
        }

        private void ClientInfo_Click(object sender, RoutedEventArgs e)
        {
            if (ClientList.SelectedItem != null)
            {
                Client currentClient = (Client)ClientList.SelectedItem;
                NavigationService.Navigate(new СlientInfoPage(currentClient));
            }
            else
            {
                return;
            }
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
                LoadClients();
            }
        }

        private void AscendingRadioButton_Checked(object sender, RoutedEventArgs e)
        {
            sortSelect = OrderType.Ascending;
            LoadClients();
        }

        private void DescendingRadioButton_Checked(object sender, RoutedEventArgs e)
        {
            sortSelect = OrderType.Descending;
            LoadClients();
        }

        private void LoadData_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            try
            {
                SearchTextBox.Text = null;
                ReleaseAscendingRadioButton.IsChecked = false;
                ReleaseDescendingRadioButton.IsChecked = false;
                sortSelect = OrderType.None;
                LoadClients();
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
