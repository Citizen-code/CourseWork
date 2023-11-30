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
        private readonly Service _service;
        private readonly bool IsAdded;

        public ServiceAddPage()
        {
            InitializeComponent();
            _service = new Service();
            _service.Price = new ServicePrice();
            IsAdded = true;
            IsHourlyCheckBox.IsChecked = false;
            this.DataContext = _service;
        }

        public ServiceAddPage(Service service)
        {
            InitializeComponent();
            _service = service;
            IsHourlyCheckBox.IsChecked = false;
            this.DataContext = _service;
        }

        private async void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                _service.Name = ServiceNameTextBox.Text;
                _service.Price.Price = Convert.ToDecimal(ServicePriceTextBox.Text);
                _service.Price.IsTimeBased = IsHourlyCheckBox.IsChecked == true;
                switch (IsAdded)
                {
                    case true:
                        await ApiRestClient.Api.Services.PostService(new ServiceRequest() { Name = _service.Name, Price = _service.Price.Price, IsTimeBased = _service.Price.IsTimeBased });
                        MessageBox.Show("Успешное добавление услуги.", "Информация", MessageBoxButton.OK, MessageBoxImage.Information);
                        NavigationService.GoBack();
                        break;
                    case false:
                        await ApiRestClient.Api.Services.PutService(_service.Id, new ServiceRequest() { Name = _service.Name, Price = _service.Price.Price, IsTimeBased = _service.Price.IsTimeBased });
                        MessageBox.Show("Успешное изменение услуги.", "Информация", MessageBoxButton.OK, MessageBoxImage.Information);
                        NavigationService.GoBack();
                        break;
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
    }
}
