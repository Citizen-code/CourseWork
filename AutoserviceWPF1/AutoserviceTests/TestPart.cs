using FlaUI.Core;
using FlaUI.Core.AutomationElements;
using FlaUI.Core.Conditions;
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
    public class TestPart
    {
        private ConditionFactory conditionFactory;

        [TestMethod]
        public void CreatePart()
        {
            var app = Application.Launch($@"C:\Users\yegor\source\repos\CourseWork\AutoserviceWPF1\AutoserviceWPF\bin\Debug\AutoserviceWPF.exe");
            conditionFactory = new ConditionFactory(new UIA3PropertyLibrary());
            var mainWindow = app.GetMainWindow(new UIA3Automation()); mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("LoginTextBox")).AsTextBox().Enter("Bogdanova");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("PasswordTextBox")).AsTextBox().Enter("123");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("EnterButton")).AsButton().Click();
            Thread.Sleep(1500);
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("OpenDrawerButton")).AsButton().Click();
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("PartsNavigationItem")).Click();
            Thread.Sleep(1500);
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("AddPartButton")).AsButton().Click();
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("PartBrandTextBox")).AsTextBox().Enter("Part");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("PartVendorCodeTextBox")).AsTextBox().Enter("qwerty");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("PartBrandTextBox")).AsTextBox().Enter("Part");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("PartNameTextBox")).AsTextBox().Enter("PartName");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("PartCostTextBox")).AsTextBox().Enter("2000");
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("PartMeasureUnitCombobox")).AsComboBox().Select(0);
            mainWindow.FindFirstDescendant(conditionFactory.ByAutomationId("SaveButton")).AsButton().Click();
        }
    }
}
