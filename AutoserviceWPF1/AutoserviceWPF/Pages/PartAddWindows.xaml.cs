using AutoserviceWPF.Models;
using AutoserviceWPF.Models.ModelsDB;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO;
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
    /// Логика взаимодействия для PartAddWindows.xaml
    /// </summary>
    public partial class PartAddWindows : Page
    {
        private readonly ConsumablePart _part;
        private readonly bool IsAdded = false;

        public PartAddWindows()
        {
            InitializeComponent();
            _part = new ConsumablePart();
            IsAdded = true;
            LoadPartData();
        }

        public PartAddWindows(ConsumablePart part) 
        {
            InitializeComponent();
            _part = part;
            LoadPartData();
        }

        public void LoadPartData()
        {
            this.DataContext = _part;
            PartMeasureUnitCombobox.Items.Add("шт");
            PartMeasureUnitCombobox.Items.Add("л");
        }

        private async void AddPartButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                _part.Brand = PartBrandTextBox.Text;
                _part.Article = PartVendorCodeTextBox.Text;
                _part.Name = PartNameTextBox.Text;
                _part.Price = Convert.ToDecimal(PartCostTextBox.Text);
                _part.MeasureUnit = (String)PartMeasureUnitCombobox.SelectedItem;

                //TODO: Переделать на switch.
                if (IsAdded)
                {
                    await ApiRestClient.Api.ConsumableParts.PostConsumablePart(_part);
                    NavigationService.GoBack();
                }
                else
                {
                    await ApiRestClient.Api.ConsumableParts.PutConsumablePart(_part.Id, _part);
                    NavigationService.GoBack();
                }
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

        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            NavigationService.GoBack();
        }

        private async void PartPhoto_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            if (openFileDialog.ShowDialog() == true)
            {
                PartPhoto.DataContext = File.ReadAllBytes(openFileDialog.FileName);
                _part.Photo = await ApiRestClient.Api.Photo.PostPhoto(openFileDialog.FileName);
            }
        }
    }
}
