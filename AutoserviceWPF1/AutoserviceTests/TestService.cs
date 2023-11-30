using FlaUI.Core;
using FlaUI.Core.AutomationElements;
using FlaUI.Core.Conditions;
using FlaUI.Core.Input;
using FlaUI.UIA3;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AutoserviceTests
{
    [TestClass]
    public class TestService
    {
        private ConditionFactory conditionFactory;

        [TestMethod]
        public void CreateService()
        {
            var app = Application.Launch($@"C:\Users\yegor\source\repos\CourseWork\AutoserviceWPF1\AutoserviceWPF\bin\Debug\AutoserviceWPF.exe");
            conditionFactory = new ConditionFactory(new UIA3PropertyLibrary());
            var mainWindow = app.GetMainWindow(new UIA3Automation()); mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("LoginTextBox")).AsTextBox().Enter("Bogdanova");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("PasswordTextBox")).AsTextBox().Enter("123");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("EnterButton")).AsButton().Click();
            Thread.Sleep(1000);
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("OpenDrawerButton")).AsButton().Click();
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("ServicesNavigationItem")).Click();
            Thread.Sleep(1500);
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("AddServiceButton")).AsButton().Click();
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("ServiceNameTextBox")).AsTextBox().Enter("Service");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("ServicePriceTextBox")).AsTextBox().Enter("1245");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("IsHourlyTextBox")).AsCheckBox().Click();
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("SaveButton")).AsButton().Click();
        }

        [TestMethod]
        public void UpdateService()
        {
            var app = Application.Launch($@"C:\Users\yegor\source\repos\CourseWork\AutoserviceWPF1\AutoserviceWPF\bin\Debug\AutoserviceWPF.exe");
            conditionFactory = new ConditionFactory(new UIA3PropertyLibrary());
            var mainWindow = app.GetMainWindow(new UIA3Automation()); mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("LoginTextBox")).AsTextBox().Enter("Bogdanova");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("PasswordTextBox")).AsTextBox().Enter("123");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("EnterButton")).AsButton().Click();
            Thread.Sleep(1000);
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("OpenDrawerButton")).AsButton().Click();
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("ServicesNavigationItem")).Click();
            Thread.Sleep(1500);
            Mouse.MoveBy(66, 12);
            Mouse.DoubleClick();
            Thread.Sleep(1000);
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("ServiceNameTextBox")).AsTextBox().Enter("Test1");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("ServicePriceTextBox")).AsTextBox().Enter("650");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("SaveButton")).AsButton().Click();
        }

        [TestMethod]
        public void DeleteService()
        {
            var app = Application.Launch($@"C:\Users\yegor\source\repos\CourseWork\AutoserviceWPF1\AutoserviceWPF\bin\Debug\AutoserviceWPF.exe");
            conditionFactory = new ConditionFactory(new UIA3PropertyLibrary());
            var mainWindow = app.GetMainWindow(new UIA3Automation()); mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("LoginTextBox")).AsTextBox().Enter("Bogdanova");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("PasswordTextBox")).AsTextBox().Enter("123");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("EnterButton")).AsButton().Click();
            Thread.Sleep(1000);
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("OpenDrawerButton")).AsButton().Click();
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("ServicesNavigationItem")).Click();
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("SearchTextBox")).AsTextBox().Enter("Test");
            Thread.Sleep(1000);
            Mouse.MoveBy(88, 12);
            Mouse.DoubleClick();
            Thread.Sleep(1000);
            Mouse.MoveBy(-350, 180);
            Mouse.Click();
        }
    }
}
