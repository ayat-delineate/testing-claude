import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import {
  CreditCard,
  MapPin,
  User,
  Phone,
  Mail,
  ArrowLeft,
  Lock,
  CheckCircle,
} from "lucide-react";
import Swal from "sweetalert2";

// Mock Stripe publishable key (in real app, this would be from environment variables)
const stripePromise = loadStripe("pk_test_mock_key_for_development");

const CheckoutForm = ({ cartItems, totalAmount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Simulate creating payment intent
    const createPaymentIntent = async () => {
      try {
        // In real app, this would be an API call to your backend
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setClientSecret("pi_mock_client_secret_for_development");
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    createPaymentIntent();
  }, [totalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful payment
      const result = {
        paymentIntent: {
          status: "succeeded",
          id: `pi_${Date.now()}_mock`,
        },
      };

      if (result.error) {
        await Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: result.error.message,
          confirmButtonText: "Try Again",
        });
      } else if (result.paymentIntent.status === "succeeded") {
        await Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: "Your order has been placed successfully.",
          timer: 2000,
          showConfirmButton: false,
        });

        onSuccess(result.paymentIntent.id);
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "An error occurred during payment processing.",
        confirmButtonText: "Try Again",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Payment Information
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Information
            </label>
            <div className="border border-gray-300 rounded-lg p-3 bg-white">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5 mr-2" />
            Pay ${totalAmount.toFixed(2)}
          </>
        )}
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({});
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const totalAmount = getCartTotal();
  const shippingCost = 0; // Free shipping
  const taxAmount = 0; // No tax for demo
  const finalTotal = totalAmount + shippingCost + taxAmount;

  useEffect(() => {
    if (cartItems.length === 0 && !isPaymentCompleted) {
      navigate("/cart");
    }
  }, [cartItems, navigate, isPaymentCompleted]);

  const onPaymentSuccess = (paymentIntentId) => {
    // Set payment completed flag before clearing cart
    setIsPaymentCompleted(true);
    // Clear cart and redirect to invoice
    clearCart();
    navigate(`/invoice/${paymentIntentId}`);
  };

  const onSubmitShipping = (data) => {
    setShippingInfo(data);
    setCurrentStep(2);
  };

  if (cartItems.length === 0 && !isPaymentCompleted) {
    return (
      <>
        <Helmet>
          <title>Checkout - MedicineVendor</title>
          <meta name="description" content="Complete your purchase" />
        </Helmet>

        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                No Items to Checkout
              </h1>
              <p className="text-gray-600 mb-8">Your cart is empty.</p>
              <button
                onClick={() => navigate("/shop")}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout - MedicineVendor</title>
        <meta name="description" content="Complete your purchase" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate("/cart")}
              className="flex items-center text-primary-600 hover:text-primary-700 transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back to Cart
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8">
              <div
                className={`flex items-center ${
                  currentStep >= 1 ? "text-primary-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= 1
                      ? "bg-primary-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
                </div>
                <span className="ml-2 font-medium">Shipping</span>
              </div>

              <div
                className={`w-16 h-0.5 ${
                  currentStep >= 2 ? "bg-primary-600" : "bg-gray-200"
                }`}
              ></div>

              <div
                className={`flex items-center ${
                  currentStep >= 2 ? "text-primary-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= 2
                      ? "bg-primary-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  2
                </div>
                <span className="ml-2 font-medium">Payment</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <form
                  onSubmit={handleSubmit(onSubmitShipping)}
                  className="space-y-6"
                >
                  {/* Shipping Information */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Shipping Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          {...register("firstName", {
                            required: "First name is required",
                          })}
                          type="text"
                          className="input-field"
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          {...register("lastName", {
                            required: "Last name is required",
                          })}
                          type="text"
                          className="input-field"
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <input
                          {...register("address", {
                            required: "Address is required",
                          })}
                          type="text"
                          className="input-field"
                          placeholder="Enter your address"
                        />
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.address.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          {...register("city", {
                            required: "City is required",
                          })}
                          type="text"
                          className="input-field"
                          placeholder="Enter your city"
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.city.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Postal Code
                        </label>
                        <input
                          {...register("postalCode", {
                            required: "Postal code is required",
                          })}
                          type="text"
                          className="input-field"
                          placeholder="Enter postal code"
                        />
                        {errors.postalCode && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.postalCode.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          {...register("phone", {
                            required: "Phone number is required",
                          })}
                          type="tel"
                          className="input-field"
                          placeholder="Enter your phone number"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                  >
                    Continue to Payment
                  </button>
                </form>
              )}

              {currentStep === 2 && (
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    cartItems={cartItems}
                    totalAmount={finalTotal}
                    onSuccess={onPaymentSuccess}
                  />
                </Elements>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.medicineName}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {item.medicineName}
                        </h4>
                        <p className="text-xs text-gray-500">{item.company}</p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-lg font-bold text-primary-600">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {shippingInfo.firstName && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Shipping to:
                    </h3>
                    <p className="text-sm text-gray-600">
                      {shippingInfo.firstName} {shippingInfo.lastName}
                      <br />
                      {shippingInfo.address}
                      <br />
                      {shippingInfo.city}, {shippingInfo.postalCode}
                      <br />
                      {shippingInfo.phone}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CheckoutPage;
