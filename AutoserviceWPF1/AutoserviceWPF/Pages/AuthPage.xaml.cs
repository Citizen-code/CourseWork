using AutoserviceWPF.Models;
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
    /// Логика взаимодействия для AuthPage.xaml
    /// </summary>
    public partial class AuthPage : Page
    {
        public AuthPage()
        {
            InitializeComponent();
        }

        private async void EnterButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                await ApiRestClient.Login(new Uri("http://185.252.146.21"), LoginTextBox.Text, PasswordBox.Password);
                var list = await ApiRestClient.Api.Client.GetClients();
                MessageBox.Show(list[9].Surname);
                NavigationService.Navigate(new CarTasksPage());
            }
            catch (Exception ex)
            {
                if (ex is ApiError error)
                {
                    if (error.Error.Errors.Count > 0)
                    {
                        string errorList = string.Join("\n", error.Error.Errors);
                        MessageBox.Show(errorList, error.Message);
                    }
                    else MessageBox.Show(error.Message, "Ошибка");
                }
                else
                    MessageBox.Show(ex.Message, "Ошибка");
            }
        }
    }
}
