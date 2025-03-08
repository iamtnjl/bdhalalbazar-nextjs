export function deferred() {
  let _deferred = {};
  _deferred.promise = new Promise(function (resolve, reject) {
    _deferred.resolve = resolve;
    _deferred.reject = reject;
  });
  return _deferred;
}

export function pick(obj, props) {
  // Create new object
  var picked = {};

  // Loop through props and push to new object
  for (let prop of props) {
    picked[prop] = obj[prop];
  }

  // Return new object
  return picked;
}

export function pickDifference(initialValues, submittedValues) {
  // Pull out all keys from the object
  const keys = Object.keys(initialValues);

  // Create a new object
  const picked = {};

  for (let key of keys) {
    // Loop through the object and pick changed values
    if (initialValues[key] !== submittedValues[key]) {
      picked[key] = submittedValues[key];
    }
  }

  // Return new object
  return picked;
}

// Sanitize query params and return searched params
export function sanitizeParams(params) {
  // Initial params object
  const sanitizedObj = {};

  for (const key in params) {
    if (params[key]) {
      sanitizedObj[key] = params[key];
    }
  }

  return sanitizedObj;
}

// Format currency using the Browser Intl API
export function formatCurrency(data) {
  // Created an instance
  const formatCurrency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "BDT",
  });

  // Return the formatted currency
  return formatCurrency.format(data).slice(4);
}

// Check current roles permission
export function checkAccess(currentRole = "", permittedRoles = []) {
  const hasAccess = permittedRoles
    .map((role) => role.toUpperCase()) // Convert the role to uppercase
    .includes(currentRole.toUpperCase()); // Check access depending on role

  // Returned a boolean value
  return hasAccess;
}

export function formatFilterOptions(data) {
  return data?.map((item) => ({
    label: item.name,
    value: item.slug,
  }));
}
