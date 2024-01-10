using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace calculator_api
{
    public class Calculate
    {
        public string firstNumber { get; set; }
        public string secondNumber { get; set; }
        public string operation { get; set; }

        public double calculateValue()
        {

            double firstNumber = Convert.ToDouble(this.firstNumber);
            double secondNumber = Convert.ToDouble(this.secondNumber);
            double result = 0;

            switch (this.operation)
            {
                case "add":
                    result = firstNumber + secondNumber;
                    break;
                case "subtract":
                    result = firstNumber - secondNumber;
                    break;
                case "multiply":
                    result = firstNumber * secondNumber;
                    break;
                case "divide":
                    result = firstNumber / secondNumber;
                    break;
                default:
                    break;
            }

            return result;
        }
    }
}