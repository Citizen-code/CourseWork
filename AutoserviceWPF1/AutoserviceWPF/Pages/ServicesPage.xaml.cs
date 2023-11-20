using AutoserviceWPF.Models;
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
    /// Логика взаимодействия для ServicesPage.xaml
    /// </summary>
    public partial class ServicesPage : Page
    {
        int Page = 1;
        int PagesCount = 1;

        public ServicesPage()
        {
            InitializeComponent();
        }

        private async void LoadServices()
        {
            try
            {
                ServicesListView.ItemsSource = null;
                int pages = (await ApiRestClient.Api.Client.GetCountClients()).CountPages;
                if (PagesCount != pages)
                    for (int i = 1; i < pages + 1; i++)
                        Pagination.Items.Add(i);
                PagesCount = pages;
                ServicesListView.ItemsSource = await ApiRestClient.Api.Client.GetClients(false, true, Page);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Ошибка", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void TasksNavigationItem_PreviewMouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            NavigationService.Navigate(new CarTasksPage());
        }

        private void RequestsNavigationItem_PreviewMouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            NavigationService.Navigate(new RequestsPage());
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

        private void AddServiceButton_Click(object sender, RoutedEventArgs e)
        {
            NavigationService.Navigate(new ServiceAddPage());
        }
    }
}
