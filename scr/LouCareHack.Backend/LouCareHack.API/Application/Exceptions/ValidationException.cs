using FluentValidation.Results;

namespace LouCareHack.API.Application.Exceptions;

public class ValidationException : Exception
{
    public ValidationException() : base("Se han producido uno o más errores de validación") 
    {
        Errors = [];
    }

    public List<string> Errors { get; private set; }

    public ValidationException(IEnumerable<ValidationFailure> failures) : this()
    {
        foreach (var failure in failures)
        {
            Errors.Add(failure.ErrorMessage);
        }
    }
}
