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
    /// Логика взаимодействия для CarUpdatePage.xaml
    /// </summary>
    public partial class CarUpdatePage : Page
    {
        private readonly Client _client;

        public CarUpdatePage(Client client)
        {
            InitializeComponent();
            _client = client;
            this.DataContext = _client;
        }

        private async void AddPartButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                _client.Car.Name = CarNameTextBox.Text;
                _client.Car.Number = CarNumberTextBox.Text;
                _client.Car.ReleaseYear = Convert.ToInt32(CarReleaseYearTextBox.Text);
                _client.Car.Mileage = CarMileageTextBox.Text;
                _client.Car.Vin = CarVinTextBox.Text;
                _client.Car.Color = CarColorTextBox.Text;

                await ApiRestClient.Api.Cars.PutCar(_client.Car.Id, _client.Car);
                NavigationService.GoBack();
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
    }
}
