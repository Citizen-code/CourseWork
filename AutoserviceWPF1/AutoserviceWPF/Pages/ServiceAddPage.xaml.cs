using AutoserviceWPF.Models;
using AutoserviceWPF.Models.ModelsDB;
using AutoserviceWPF.Models.ModelsRequest;
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
    /// Логика взаимодействия для ServiceAddPage.xaml
    /// </summary>
    public partial class ServiceAddPage : Page
    {
        public ServiceAddPage()
        {
            InitializeComponent();
        }

        private async void AddServiceButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                Decimal.TryParse(ServicePriceTextBox.Text,out decimal price);
                if(price == 0) throw new Exception("Неверная цена");
                ServiceRequest service = new ServiceRequest { Name = ServiceNameTextBox.Text, Price = price, IsTimeBased = IsHourlyTextBox.IsChecked };
                await ApiRestClient.Api.Services.PostService(service);
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
