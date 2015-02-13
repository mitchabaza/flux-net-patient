using System;
using System.Collections.Generic;
using System.Linq;
 

namespace WebService.Service
{
    public class FakeFormService : IFormService
    {
        
        private readonly string[] _signsSymptoms = new string[10]
        {
            "Fever",
            "Urgency",
            "Frequency",
            "Dysuria",
            "Suprapubic tenderness",
            "Costovertebral angle pain or tenderness",
            "Abscess",
            "Pain or tenderness",
            "Purulent drainage or material",
            "Other evidence of infection found on direct exam, during surgery, or by diagnostic tests"
        };

        private readonly string[] _lab = new string[5]
        {
            "Positive blood culture",
            "Positive culture",
            "Other positive laboratory tests",
            "Positive culture of pathogen",
            "Positive culture of skin contaminant"
        };
        public List<Tuple<string, string>> ListFields(string field)
        {
            var list = new List<Tuple<string, string>>();

            if (field.Equals("Lab"))
            {
                return _lab.Select(a => new Tuple<string, string>(a, a)).ToList();
            }
            else if (field.Equals("SignsSymptoms"))
            {
                return _signsSymptoms.Select(a => new Tuple<string, string>(a, a)).ToList();
            }
            else
            {
                return list;
            }
        }
    }
}