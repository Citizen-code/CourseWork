﻿using AutoserviceWPF.Models;
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
    /// Логика взаимодействия для ClientsPage.xaml
    /// </summary>
    public partial class ClientsPage : Page
    {
        int page = 1;
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
                int pages = (await ApiRestClient.Api.Client.GetCountClients()).CountPages;
                Pagination.Items.Clear();
                for (int i = page > 5 ? page - 5 : 1; i < (((page + 5) < pages) ? page + 5 : pages); i++)
                {
                    Pagination.Items.Add(i);
                }
                pagesCount = pages;
                ClientList.ItemsSource = await ApiRestClient.Api.Client.GetClients(true, true, page);
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

        private void TasksNavigationItem_PreviewMouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            NavigationService.Navigate(new CarTasksPage());
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
    }
}