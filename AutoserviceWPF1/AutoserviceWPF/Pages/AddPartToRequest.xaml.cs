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
    /// Логика взаимодействия для AddPartToRequest.xaml
    /// </summary>
    public partial class AddPartToRequest : Page
    {
        private readonly Order _order;
        private readonly List<ListService> _listService;
        private readonly ListConsumablePart _part;
        private readonly List<ListConsumablePart> _listConsumablePart;

        public AddPartToRequest(Order order, List<ListService> listService)
        {
            InitializeComponent();
            _order = order;         
            _listService = listService;
            this.DataContext = _part;
        }

        private void AddPart_Click(object sender, RoutedEventArgs e)
        {
            ListConsumablePart currentPart = (ListConsumablePart)PartsListView.SelectedItem;
            _listConsumablePart.Add(currentPart);
            PartsToRequestListView.Items.Add(currentPart);
        }

        private void DeletePart_Click(object sender, RoutedEventArgs e)
        {
            ListConsumablePart currentPart = (ListConsumablePart)PartsToRequestListView.SelectedItem;
            _listConsumablePart.Remove(currentPart);
            PartsToRequestListView.Items.Remove(currentPart);
        }

        private async void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            await ApiRestClient.Api.Orders.AddContentOrder(_order.Id, _listService, _listConsumablePart);
            MessageBox.Show($"{_listConsumablePart.Count}", "test");
        }
    }
}
