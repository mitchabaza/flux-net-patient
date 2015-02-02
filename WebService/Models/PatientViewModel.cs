﻿using System;
using Newtonsoft.Json;

namespace WebService.Models
{
    public class PatientViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DateOfBirth { get; set; }
        public string MRN { get; set; }
        public string AdmitDate { get; set; }
        public string SSN { get; set; }

    }
}