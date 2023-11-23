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
    /// Логика взаимодействия для AddServiceToRequestPage.xaml
    /// </summary>
    public partial class AddServiceToRequestPage : Page
    {
        private readonly Order _order;
        private readonly ListService _service;
        private List<ListService> _listService;

        public AddServiceToRequestPage(Order order)
        {
            InitializeComponent();
            _order = order;
            ServicesListView.DataContext = _service;
            ServicesToRequestListView.DataContext = _service;
        }

        private void AddService_Click(object sender, RoutedEventArgs e)
        {
            ListService currentService = (ListService)ServicesListView.SelectedItem;
            _listService.Add(currentService);
            ServicesToRequestListView.Items.Add(currentService);
        }

        private void DeleteService_Click(object sender, RoutedEventArgs e)
        {
            ListService currentService = (ListService)ServicesToRequestListView.SelectedItem;
            _listService.Remove(currentService);
            ServicesToRequestListView.Items.Remove(currentService);
        }

        private void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            NavigationService.Navigate(new AddPartToRequest(_order, _listService));
        }
    }
}
