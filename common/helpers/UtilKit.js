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

export function formatCurrency(amount, separator = " ") {
  return parseInt(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export function isEqual(obj1, obj2) {
  if (obj1 === obj2) return true; // Same reference

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false; // If not objects, they must be strictly equal
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false; // Different number of keys

  for (let key of keys1) {
    if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

export function createUrlSearchParams(paramsObj) {
  const searchParams = new URLSearchParams();

  for (const key in paramsObj) {
    if (Object.prototype.hasOwnProperty.call(paramsObj, key)) {
      const value = paramsObj[key];
      if (value === undefined || value === null || value === "") {
        continue;
      }
      if (Array.isArray(value)) {
        const filteredArray = value.filter((item) => item !== "");
        if (filteredArray.length > 0) {
          searchParams.append(key, filteredArray.join(","));
        }
      } else {
        searchParams.append(key, value);
      }
    }
  }
  return searchParams.toString();
}

export function arrayToParams(arr) {
  if (Array.isArray(arr) && arr.length > 0) {
    return arr.join(",");
  }
  return arr;
}

export const transformOptionsData = (data) => {
  const transformedData = {
    options: [
      ...data?.results.map((item) => {
        return {
          label: item.name,
          value: item.slug,
        };
      }),
    ],
    hasMore: !!data.next,
  };

  return transformedData;
};

export const loadOptions = async (inputValue, _, { page }, promise) => {
  try {
    const response = await promise(
      sanitizeParams({ search: inputValue, page })
    );
    const transformed = transformOptionsData(response.data);
    return {
      options: transformed.options,
      hasMore: transformed.hasMore,
      additional: { page: page + 1 },
    };
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return { options: [], hasMore: false };
  }
};
