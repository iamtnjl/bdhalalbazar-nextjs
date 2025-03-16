"use client";

import APIKit from "@/common/helpers/APIKit";
import SectionTitle from "@/components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ExpandAbleProductCardList from "./components/ExpandAbleProductCardList";
import AddAddress from "./components/AddAddress";
import AddressInfo from "./components/AddressInfo";
import Button from "@/components/shared/Button";
import Payment from "./components/Payment";
import PaymentBreakdown from "./components/PaymentBreakdown";
import ConfirmOrder from "./components/ConfirmOrder";
import { AUTH_TOKEN_KEY } from "@/common/helpers/KeyChain";
import ProfileInfo from "./components/ProfileInfo";
import TextInputField from "@/components/from/TextInputField";
import PhoneInputField from "@/components/from/PhoneInputField";
import { object, string } from "yup";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import FormikErrorBox from "@/components/from/FormikErrorBox";
import { useCart } from "@/providers/CartProvider";
import { useRouter } from "next/navigation";

const yupAddressAddSchema = object({
  name: string().required("Please enter your name"),
  phone: string().required("Please enter your phone"),
  label: string(),
  street: string(),
  district: string(),
  division: string(),
  aria: string(),
});

const deviceId = localStorage.getItem("deviceId");

const CheckOut = () => {
  const [showForm, setShowForm] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [selected, setSelected] = useState({});
  const [paymentMethod, setPaymentMethod] = useState();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(false);
  const [user, setUser] = useState({});
  const { clearCart } = useCart();
  const router = useRouter();

  const payment = [{ slug: "cash-on-deliver", name: "Cash on delivery" }];

  // Get Cart
  const { data, refetch } = useQuery({
    queryKey: [`/carts`],
    queryFn: () => APIKit.public.getCart({ deviceId }).then(({ data }) => data),
  });

  async function fetchUserData() {
    const authKey = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!authKey) {
      console.error("No auth-key found in localStorage");
      return null;
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/me`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }

  useEffect(() => {
    fetchUserData().then((userData) => {
      if (userData) {
        setUser(userData);
      }
    });
  }, []);

  const addresses = user?.user?.address || [];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.user?.name || "",
      phone: user?.user?.phone || "",
      label: addresses[0]?.label || "",
      street: addresses[0]?.street || "",
      district: addresses[0]?.district || "",
      division: addresses[0]?.division || "",
      area: addresses[0]?.area || "",
    },
    validationSchema: yupAddressAddSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      const handleSuccess = ({ data }) => {
        setBackendErrors({});
        refetch();
        setShowForm(false);
      };
      const handleFailure = (error) => {
        console.warn(error?.response);
        setBackendErrors(error?.response?.data);
        throw error;
      };

      let payload = pick(values, Object.keys(values));

      const promise = APIKit.me.address
        .postAddress(payload)
        .then(handleSuccess)
        .catch(handleFailure)
        .finally(() => setSubmitting(false));

      return toast.promise(promise, {
        loading: "Loading...",
        success: "Address Saved Successfully!",
        error: "Something went wrong",
      });
    },
  });

  const placeOrder = () => {
    const payload = {
      name: formik.values.name,
      phone: formik.values.phone,
      address: {
        label: formik.values.label,
        district: formik.values.district,
        division: formik.values.division,
        street: formik.values.street,
        area: formik.values.area,
      },
      cart_id: data._id,
      payment_method: paymentMethod.slug,
    };

    const promise = APIKit.public
      .placeOrder(payload)
      .then(({ data }) => {
        router.push(`/me/orders/${data.order._id}`);
        clearCart();
      })
      .catch((err) => {
        throw err;
      });

    return toast.promise(promise, {
      loading: "Placing order...",
      success: "Order successfully placed.",
      error: "Something went wrong!",
    });
  };

  return (
    <div className="px-2 py-4 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <SectionTitle title={"Checkout"} />
        <p className="text-sm text-gray-600">
          Please Review All Details before Placing Order
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <ExpandAbleProductCardList cart={data} />
        {Object.keys(user)?.length > 0 ? (
          <ProfileInfo data={user.user} />
        ) : (
          <>
            <h3 className="font-semibold text-base text-grey-500 mt-2">
              Customer information
            </h3>
            <div>
              <TextInputField
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Name"
                placeholder="E.g: John Doe"
              />
              <FormikErrorBox formik={formik} field="name" />
            </div>
            <div>
              <PhoneInputField
                label="Phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="E.g: 12345678"
              />
              <FormikErrorBox formik={formik} field="phone" />
            </div>
          </>
        )}
        <div className="flex flex-col gap-2 mt-2">
          <h3 className="font-semibold text-base text-grey-500">
            Delivery Address
          </h3>
        </div>
        <div className="flex flex-col gap-4">
          {addresses?.length > 0 ? (
            <AddressInfo
              selected={selected}
              addresses={addresses}
              setShowAddress={setShowAddress}
            />
          ) : (
            <>
              <AddAddress
                formik={formik}
                setShowForm={setShowForm}
                refetch={refetch}
              />
            </>
          )}

          {showAddress && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-2">
                <button
                  className="w-full border border-grey-300 bg-white text-primary text-sm font-bold p-2 rounded-md"
                  onClick={() => setShowForm(true)}
                >
                  + Add New Address
                </button>
              </div>
              {showForm ? (
                <AddAddress
                  formik={formik}
                  Cancel
                  setShowForm={setShowForm}
                  refetch={refetch}
                  setShowAddress={setShowAddress}
                />
              ) : null}
            </div>
          )}

          {/* Payment Method Section */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-base text-grey-500 mt-2">
              Payment Method
            </h3>
            <Payment
              payment={payment}
              setPaymentMethod={setPaymentMethod}
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
            />
          </div>

          <PaymentBreakdown data={data} />

          {/* Place Order Buttons with two warnings for missing address and missing payment method */}
          <ConfirmOrder
            addresses={addresses}
            paymentMethod={paymentMethod}
            handlePlaceOrder={placeOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
