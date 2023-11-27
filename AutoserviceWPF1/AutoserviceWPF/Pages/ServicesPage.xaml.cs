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
    /// Логика взаимодействия для ServicesPage.xaml
    /// </summary>
    public partial class ServicesPage : Page
    {
        int page = 1;
        int pagesCount = 1;

        public ServicesPage()
        {
            InitializeComponent();
        }

        private async void LoadServices()
        {
            try
            {
                ServicesListView.ItemsSource = null;
                int pages = (await ApiRestClient.Api.Services.GetCountServices()).CountPages;
                Pagination.Items.Clear();
                for (int i = page > 5 ? page - 5 : 1; i < (((page + 5) < pages) ? page + 5 : pages); i++)
                {
                    Pagination.Items.Add(i);
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

        private void Pagination_Selected(object sender, RoutedEventArgs e)
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

        private void UpdateService_Click(object sender, RoutedEventArgs e)
        {
            if (ServicesListView.SelectedItem != null)
            {
                Service currentService = (Service)ServicesListView.SelectedItem;
                NavigationService.Navigate(new ServiceAddPage(currentService));
            }
            else
            {
                return;
            }
        }

        private async void DeleteService_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            try
            {
                Service currentService = (Service)ServicesListView.SelectedItem;
                if (MessageBox.Show("Вы хотите удалить услугу ?", "Внимание", MessageBoxButton.YesNo, MessageBoxImage.Warning) == MessageBoxResult.Yes)
                {
                    await ApiRestClient.Api.Services.DeleteService(currentService.Id);
                    LoadServices();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Ошибка", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
