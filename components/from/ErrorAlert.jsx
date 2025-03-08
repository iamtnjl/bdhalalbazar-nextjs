"use client";

import { XCircleIcon } from "@heroicons/react/20/solid";

export default function ErrorAlert({ errors = {}, field }) {
  return field in errors && errors[field].length ? (
    <div className="rounded-md bg-red-50 p-3 mt-2">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          {errors[field].map((msg) => (
            <p key={msg} className="text-sm text-red-800">
              {msg}
            </p>
          ))}
        </div>
      </div>
    </div>
  ) : null;
}
