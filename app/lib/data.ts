import {formatCurrency} from './utils';
import {customers, invoices, revenue} from '@/app/lib/placeholder-data';

export async function fetchRevenue() {
  try {
    return revenue;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = invoices.slice(0, 5);

    return data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    let totalPaid = 0;
    let totalPending = 0;

    invoices.forEach((invoice) => {
      if (invoice.status === 'paid') {
        totalPaid += invoice.amount;
      } else if (invoice.status === 'pending') {
        totalPending += invoice.amount;
      }
    });

    const numberOfInvoices = invoices.length;
    const numberOfCustomers = customers.length;
    const totalPaidInvoices = formatCurrency(totalPaid ?? '0');
    const totalPendingInvoices = formatCurrency(totalPending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const filteredInvoices = invoices.filter((invoice) =>
      Object.values(invoice).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(query.toLowerCase()),
      ),
    );

    // Apply pagination
    return filteredInvoices.slice(offset, offset + ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages() {
  try {
    const totalPages = Math.ceil(invoices.length / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}
