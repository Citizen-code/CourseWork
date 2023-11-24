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
    /// Логика взаимодействия для PartsPage.xaml
    /// </summary>
    public partial class PartsPage : Page
    {
        int page = 1;
        int pagesCount = 1;

        public PartsPage()
        {
            InitializeComponent();
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

        private void Pagination_Selected(object sender, RoutedEventArgs e)
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
                LoadParts();
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

        private void ClientsNavigationItem_PreviewMouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            NavigationService.Navigate(new ClientsPage());
        }

        private void ExitButton_Click(object sender, RoutedEventArgs e)
        {
            NavigationService.Navigate(new AuthPage());
        }

        private void AddPartButton_Click(object sender, RoutedEventArgs e)
        {
            NavigationService.Navigate(new PartAddWindows());
        }

        private void PartsList_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (PartsListView.SelectedItem != null)
            {
                ConsumablePart currentPart = (ConsumablePart)PartsListView.SelectedItem;
                NavigationService.Navigate(new PartAddWindows(currentPart));
            }
            else
            {
                return;
            }
        }
    }
}
