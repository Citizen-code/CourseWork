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
                int pages = (await ApiRestClient.Api.ConsumableParts.GetCountConsumableParts(findText: SearchTextBox.Text)).CountPages;
                if (pages < page) page = pages == 0 ? 1 : pages;
                Pagination.Items.Clear();
                for (int i = page > 5 ? page - 5 : 1; i <= (((page + 5) < pages) ? page + 5 : pages); i++)
                {
                    Pagination.Items.Add(i);
                }
                pagesCount = pages;
                PartsListView.ItemsSource = await ApiRestClient.Api.ConsumableParts.GetConsumableParts(true, true, page, findText: SearchTextBox.Text);
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

        private async void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                await ApiRestClient.Api.Orders.AddContentOrder(_order.Id, _listServices, _listParts);
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

        private void PartsListView_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            try
            {
                _listPart = new ListConsumablePart() { ConsumablePartId = ((ConsumablePart)PartsListView.SelectedItem).Id, ConsumablePart = (ConsumablePart)PartsListView.SelectedItem };
                _listParts.Add(_listPart);
                PartsToRequestListView.Items.Add(_listPart);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Ошибка", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void PartsToRequestListView_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            try
            {
                ListConsumablePart currentListConsumablePart = (ListConsumablePart)PartsToRequestListView.SelectedItem;
                _listParts.Remove(currentListConsumablePart);
                PartsToRequestListView.Items.Remove(currentListConsumablePart);
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
                LoadParts();
            }
        }
    }
}