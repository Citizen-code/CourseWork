using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace AutoserviceWPF.Models.ModelsDB
{
    public partial class Order
    {
        public string DateFormat { get => $"{Date.ToShortDateString()} {Time.Substring(0, Time.Length - 3)}"; }
        public Visibility StatusVisibility { get => StatusId == 2 ? Visibility.Visible : Visibility.Collapsed; }
        public string CommentVisibility { get => Comment != null ? $"{Comment.Substring(0, Math.Min(Comment.Length, 75))}{(Comment.Length > 70 ? "..." : "")}" : ""; }
    }
}
