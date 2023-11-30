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
    public class TestClient
    {
        private ConditionFactory conditionFactory;

        [TestMethod]
        public void InfoClient()
        {
            var app = Application.Launch($@"C:\Users\yegor\source\repos\CourseWork\AutoserviceWPF1\AutoserviceWPF\bin\Debug\AutoserviceWPF.exe");
            conditionFactory = new ConditionFactory(new UIA3PropertyLibrary());
            var mainWindow = app.GetMainWindow(new UIA3Automation());
            Thread.Sleep(1000);
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("LoginTextBox")).AsTextBox().Enter("Bogdanova");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("PasswordTextBox")).AsTextBox().Enter("123");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("EnterButton")).AsButton().Click();
            Thread.Sleep(1000);
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("OpenDrawerButton")).AsButton().Click();
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("ClientsNavigationItem")).Click();
            Thread.Sleep(1500);
            Mouse.MoveBy(-623, 90);
            Mouse.DoubleClick();
        }

        [TestMethod]
        public void UpdateCar()
        {
            var app = Application.Launch($@"C:\Users\yegor\source\repos\CourseWork\AutoserviceWPF1\AutoserviceWPF\bin\Debug\AutoserviceWPF.exe");
            conditionFactory = new ConditionFactory(new UIA3PropertyLibrary());
            var mainWindow = app.GetMainWindow(new UIA3Automation());
            Thread.Sleep(1000);
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("LoginTextBox")).AsTextBox().Enter("Bogdanova");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("PasswordTextBox")).AsTextBox().Enter("123");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("EnterButton")).AsButton().Click();
            Thread.Sleep(1000);
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("OpenDrawerButton")).AsButton().Click();
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("ClientsNavigationItem")).Click();
            Thread.Sleep(1500);
            Mouse.MoveBy(-593, 90);
            Mouse.DoubleClick();
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("CarReleaseYearTextBox")).AsTextBox().Enter("1992");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("CarMileageTextBox")).AsTextBox().Enter("200000");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("SaveButton")).AsButton().Click();
        }
    }
}
