using System.Drawing;
using System.Runtime.InteropServices;
using System.Drawing;
using System.Reflection.Metadata;
using System.Runtime.InteropServices;
using System.Windows.Forms;

namespace MiceDetect
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            MiceDetector.Start();
            MiceDetector.MouseAction += new EventHandler(Event);


            handler = new ConsoleEventDelegate(ConsoleEventCallback);
            SetConsoleCtrlHandler(handler, true);

            Application.Run(new ApplicationContext());
        }

        #region clear event
        static bool ConsoleEventCallback(int eventType)
        {
            if (eventType == 2)
            {
                MiceDetector.stop();
            }
            return false;
        }
        static ConsoleEventDelegate handler;   // Keeps it from getting garbage collected
                                               // Pinvoke
        private delegate bool ConsoleEventDelegate(int eventType);
        [DllImport("kernel32.dll", SetLastError = true)]
        private static extern bool SetConsoleCtrlHandler(ConsoleEventDelegate callback, bool add);
        #endregion


        #region handle event & output
        private static void Event(object sender, EventArgs e)
        {
            var pt = new Point();
            GetCursorPos(ref pt);

            string json = "{'action':'" + e + "','cords':[" + pt.X + "," + pt.Y + "]}";

            Console.WriteLine(json);
        }

        [DllImport("user32.dll")]
        static extern bool GetCursorPos(ref Point lpPoint);
        #endregion
    }
}