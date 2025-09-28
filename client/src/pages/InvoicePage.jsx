import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { 
  Download, 
  Printer, 
  CheckCircle, 
  Package, 
  Truck,
  ArrowLeft,
  Calendar,
  CreditCard,
  MapPin
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

const InvoicePage = () => {
  const { paymentId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Mock order data (in real app, this would be fetched from API)
  const orderData = {
    id: paymentId,
    orderNumber: `ORD-${Date.now()}`,
    date: new Date().toLocaleDateString(),
    status: 'completed',
    paymentMethod: 'Credit Card',
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'New York',
      postalCode: '10001',
      phone: '+1 (555) 123-4567'
    },
    items: [
      {
        id: 1,
        name: 'Paracetamol 500mg',
        company: 'PharmaCorp',
        quantity: 2,
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop&crop=center'
      },
      {
        id: 2,
        name: 'Ibuprofen 400mg',
        company: 'MediHealth',
        quantity: 1,
        price: 8.50,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop&crop=center'
      }
    ],
    subtotal: 34.48,
    shipping: 0,
    tax: 0,
    total: 34.48
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      const element = document.getElementById('invoice-content');
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`invoice-${orderData.orderNumber}.pdf`);
      
      await Swal.fire({
        icon: 'success',
        title: 'PDF Downloaded!',
        text: 'Your invoice has been downloaded successfully.',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'PDF Generation Failed',
        text: 'There was an error generating the PDF. Please try again.',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const printInvoice = () => {
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>Invoice - MedicineVendor</title>
        <meta name="description" content="Your order invoice" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-primary-600 hover:text-primary-700 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                Back to Home
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Order Invoice</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={printInvoice}
                className="flex items-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </button>
              <button
                onClick={generatePDF}
                disabled={isGeneratingPDF}
                className="flex items-center bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {isGeneratingPDF ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Invoice Content */}
          <div id="invoice-content" className="bg-white rounded-lg shadow-md p-8">
            {/* Invoice Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">MedicineVendor</h2>
                <p className="text-gray-600">Your Trusted Medicine Partner</p>
                <p className="text-sm text-gray-500 mt-1">
                  Email: support@medicinevendor.com | Phone: +1 (555) 123-4567
                </p>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-bold text-gray-900">INVOICE</h3>
                <p className="text-gray-600">#{orderData.orderNumber}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Date: {orderData.date}
                </p>
              </div>
            </div>

            {/* Order Status */}
            <div className="mb-8">
              <div className="flex items-center justify-center bg-green-50 border border-green-200 rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-green-800">Order Completed Successfully!</h3>
                  <p className="text-green-600">Your payment has been processed and your order is confirmed.</p>
                </div>
              </div>
            </div>

            {/* Customer & Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Billing Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900">{user?.name || 'John Doe'}</p>
                  <p className="text-gray-600">{user?.email || 'john.doe@example.com'}</p>
                  <p className="text-gray-600">{user?.phone || '+1 (555) 123-4567'}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Shipping Address
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900">{orderData.shippingAddress.name}</p>
                  <p className="text-gray-600">{orderData.shippingAddress.address}</p>
                  <p className="text-gray-600">
                    {orderData.shippingAddress.city}, {orderData.shippingAddress.postalCode}
                  </p>
                  <p className="text-gray-600">{orderData.shippingAddress.phone}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orderData.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover mr-3"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.company}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Summary */}
            <div className="flex justify-end mb-8">
              <div className="w-64">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">${orderData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total:</span>
                      <span className="text-lg font-bold text-primary-600">
                        ${orderData.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Payment Method:</p>
                  <p className="font-medium text-gray-900">{orderData.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Transaction ID:</p>
                  <p className="font-medium text-gray-900">{orderData.id}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6 text-center">
              <p className="text-gray-600 mb-2">
                Thank you for choosing MedicineVendor for your healthcare needs!
              </p>
              <p className="text-sm text-gray-500">
                If you have any questions about this order, please contact our support team.
              </p>
              <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Truck className="w-4 h-4 mr-1" />
                  Free Shipping
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Quality Guaranteed
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default InvoicePage;
