using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace calculator_api.Controllers
{
    public class CalculateController : ApiController
    {

        public IEnumerable<string> Get()
        {
            return new string[] { "This must be a POST request" };
        }

        public string Post([FromBody] string tempVar)
        {
            try
            {
                Calculate cc = JsonConvert.DeserializeObject<Calculate>(tempVar, new JsonSerializerSettings
                {
                    TypeNameHandling = TypeNameHandling.None
                });

                // Input Validation
                if (cc == null || !(double.TryParse(cc.firstNumber, out double num) && double.TryParse(cc.secondNumber, out num))) return "Invalid input";


                return "The value you wanted to calculate is equal to " + cc.calculateValue();
            }
            catch (Exception ex)
            {
                return "Error during processing: " + ex.Message;
            }
        }

    }
}