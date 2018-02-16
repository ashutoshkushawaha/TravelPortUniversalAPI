using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace UniversalApiClient.Utility
{
    public class Helper
    {
        // return a date that is n days in future
        public static String daysInFuture(int n)
        {
            DateTime now = DateTime.Now, future;
            future = now.AddDays(n);
            return string.Format("{0:yyyy-MM-dd}", future);
        }

        public static Decimal ConvertToDecimal(string s)
        {
            Regex regex = new Regex(@"^-?\d+(?:\.\d+)?");
            Match match = regex.Match(s);
            Decimal deci = new Decimal(0.0);
            if (match.Success)
            {
                deci = decimal.Parse(match.Value, CultureInfo.InvariantCulture);
            }

            return deci;
        }

        public static string ReturnPassword()
        {
            string password = CommonUtility.GetConfigValue(ProjectConstants.PASSWORD);
            return password;
        }

        public static string RetrunUsername()
        {
            string username = CommonUtility.GetConfigValue(ProjectConstants.USERNAME);
            return username;
        }

        public static Dictionary<string, string> ReturnHttpHeader()
        {
            var httpHeaders = new Dictionary<string, string>();
            //httpHeaders.Add("Username", Helper.RetrunUsername());
            //httpHeaders.Add("Password", Helper.ReturnPassword());

            httpHeaders.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(Helper.RetrunUsername() + ":" + Helper.ReturnPassword())));
            httpHeaders.Add("Accept-Encoding", "gzip");
            /*httpHeaders.Add("SOAPAction", "");
            httpHeaders.Add("Host", "twsprofiler.travelport.com");
            httpHeaders.Add("Connection", "Keep-Alive");
            httpHeaders.Add("Content-Type", "text/xml;charset=UTF-8");
            httpHeaders.Add("POST", "");*/

            return httpHeaders;
        }

        public static double parseNumberWithCurrency(String numberWithCurrency)
        {
            // first 3 chars are currency code
            String price = numberWithCurrency.Substring(3);
            return Double.Parse(price);
        }
    }
}
