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
                Service service = new Service { Name = ServiceNameTextBox.Text };
                service.Price.Price = Decimal.Parse(ServicePriceTextBox.Text);
                await ApiRestClient.Api.Services.PostService(service);
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
