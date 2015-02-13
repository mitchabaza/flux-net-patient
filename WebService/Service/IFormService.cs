using System;
using System.Collections.Generic;

namespace WebService.Service
{
    public interface IFormService
    {
        List<Tuple<string, string>> ListFields(string field);
    }
}