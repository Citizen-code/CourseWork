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
        private readonly ServiceRequest _serviceRequest;
        private readonly bool IsAdded;

        public ServiceAddPage()
        {
            InitializeComponent();
            _serviceRequest = new ServiceRequest();
            IsAdded = true;
            IsHourlyTextBox.IsChecked = false;
            LoadServiceData();
        }

        public ServiceAddPage(Service service)
        {
            InitializeComponent();
            _service = service;
            IsHourlyTextBox.IsChecked = false;
            LoadServiceData();
        }

        public void LoadServiceData()
        {
            this.DataContext = _service;
        }

        private async void AddServiceButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {

                _serviceRequest.Name = ServiceNameTextBox.Text;
                _serviceRequest.Price = Convert.ToDecimal(ServicePriceTextBox.Text);
                _serviceRequest.IsTimeBased = IsHourlyTextBox.IsChecked;

                switch (IsAdded)
                {
                    case true:
                        await ApiRestClient.Api.Services.PostService(_serviceRequest);
                        break;
                    case false:
                        await ApiRestClient.Api.Services.PutService(_service.Id, _serviceRequest);
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
