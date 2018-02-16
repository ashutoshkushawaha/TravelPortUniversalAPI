using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.Collections;
using System.Xml.Linq;
using System.Net;
using System.IO;

using UniversalApiClient.AirService;
using UniversalApiClient.SystemService;
using UniversalApiClient.HotelService;
using UniversalApiClient.Client;
using UniversalApiClient.Utility;

namespace UniversalApiClient.Controllers
{
    public class AirController : Controller
    {

        public ActionResult DomesticFlight()
        {
            return View();
        }
        public ActionResult Search()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AirSearch()
        {
            var origin = Request["origin"];
            var destination = Request["destination"];
            var departure = string.Format("{0:yyyy-MM-dd}", DateTime.Parse(Request["departure"]));
            var returning = string.Format("{0:yyyy-MM-dd}", DateTime.Parse(Request["returning"]));
            var gds = Request["gds"];

            var adult = Request["adults"];
            var children = Request["children"];
            var infants = Request["infants"];

            AvailabilitySearchRsp avaibalityRsp = new AvailabilitySearchRsp();

            try
            {
                AirSvcTest airTest = new AirSvcTest(origin, destination, departure, returning, gds);
                avaibalityRsp = airTest.Availability();
            }
            catch (Exception e)
            {
                Console.WriteLine("Error : " + e.Message);
            }

            ViewBag.flightDetails = avaibalityRsp.AirSegmentList;

            return View();
        }

        [HttpPost]
        public ActionResult HotelSearch(int noOfPeople, int noOfRooms, string hotelLocation, string currentLocation)
        {
            HotelClient hotel = new HotelClient(noOfPeople, noOfRooms, hotelLocation, currentLocation);
            BaseHotelSearchRsp hotelResponse = hotel.HotelAvailabilty();
            HotelSearchResult[] response = hotelResponse.HotelSearchResult;
            List<HotelProperty> result = new List<HotelProperty>();

            foreach (HotelSearchResult rsp in response)
            {
                foreach (HotelProperty prop in rsp.HotelProperty)
                {
                    result.Add(prop);
                }
            }

            ViewBag.result = result;

            return View();
        }

        [NonAction]
        public XDocument TestRest(string city)
        {
            XDocument xdoc = null;
            string baseUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?";

            string url = baseUrl + string.Format("q={0}&mode=xml&units=metric&cnt=7&APPID=3b21bddd81be0b22aa687c67fb2d5f2f", city);

            var client = new WebClient();
            Stream data = client.OpenRead(url);
            if (data != null)
            {
                var reader = new StreamReader(data);
                string response = reader.ReadToEnd();
                if (!string.IsNullOrEmpty(response))
                {
                    xdoc = XDocument.Parse(response);
                }
            }

            return xdoc;
        }
    }
}