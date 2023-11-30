using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using FlaUI.Core;
using FlaUI.UIA3;
using FlaUI.Core.Conditions;
using FlaUI.Core.AutomationElements;
using System.Threading;
using FlaUI.Core.Input;

namespace AutoserviceTests
{
    [TestClass]
    public class TestRequest
    {
        private ConditionFactory conditionFactory;

        [TestMethod]
        public void Login()
        {
            var app = Application.Launch($@"C:\Users\yegor\source\repos\CourseWork\AutoserviceWPF1\AutoserviceWPF\bin\Debug\AutoserviceWPF.exe");
            conditionFactory = new ConditionFactory(new UIA3PropertyLibrary());
            var mainWindow = app.GetMainWindow(new UIA3Automation());
            Thread.Sleep(1000);
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("LoginTextBox")).AsTextBox().Enter("Bogdanova");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("PasswordTextBox")).AsTextBox().Enter("123");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("EnterButton")).AsButton().Click();
        }

        [TestMethod]
        public void SearchFiltrationSort()
        {
            var app = Application.Launch($@"C:\Users\yegor\source\repos\CourseWork\AutoserviceWPF1\AutoserviceWPF\bin\Debug\AutoserviceWPF.exe");
            conditionFactory = new ConditionFactory(new UIA3PropertyLibrary());
            var mainWindow = app.GetMainWindow(new UIA3Automation());
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("LoginTextBox")).AsTextBox().Enter("Bogdanova");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("PasswordTextBox")).AsTextBox().Enter("123");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("EnterButton")).AsButton().Click();
            Thread.Sleep(1500);
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("SearchTextBox")).AsTextBox().Enter("Я бы хотел");
            Thread.Sleep(500);
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("FinallyCheckBox")).AsCheckBox().Click();
            Thread.Sleep(500);
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("DateAscendingRadioButton")).AsRadioButton().Click();
            Thread.Sleep(2000);
        }

        [TestMethod]
        public void InfoRequest()
        {
            var app = Application.Launch($@"C:\Users\yegor\source\repos\CourseWork\AutoserviceWPF1\AutoserviceWPF\bin\Debug\AutoserviceWPF.exe");
            conditionFactory = new ConditionFactory(new UIA3PropertyLibrary());
            var mainWindow = app.GetMainWindow(new UIA3Automation());
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("LoginTextBox")).AsTextBox().Enter("Bogdanova");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("PasswordTextBox")).AsTextBox().Enter("123");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("EnterButton")).AsButton().Click();
            Thread.Sleep(1500);
            Mouse.MoveBy(267, -105);
            Mouse.DoubleClick();
        }

        //TODO: Сделать тесты на добавление содержимого в Заявку, печать
    }
}
