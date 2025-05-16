import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Define interfaces for the function parameters and return values
interface TableQueryParamsOptions {
  initialFilters?: Record<string, any>;
  initialSortBy?: Array<{ key: string; order: string }>;
  initialPagination?: {
    page?: number | string;
    itemsPerPage?: number | string;
  };
  initialTab?: string | null;
}

interface SortByItem {
  key: string;
  order: string;
}

interface PaginationState {
  page?: number | string;
  itemsPerPage?: number | string;
}

interface TableQueryParamsReturn {
  filters: ReturnType<typeof ref<Record<string, any>>>;
  sortBy: ReturnType<typeof ref<SortByItem[]>>;
  pagination: ReturnType<typeof ref<PaginationState>>;
  activeTab: ReturnType<typeof ref<string | null>>;
  updateQuery: () => void;
}

export function useTableQueryParams(options: TableQueryParamsOptions = {}): TableQueryParamsReturn {
  const {
    initialFilters = {},
    initialSortBy = [],
    initialPagination = {},
    initialTab = null
  } = options;
  const route = useRoute();
  const router = useRouter();
  const filters = ref<Record<string, any>>({ ...initialFilters });
  const sortBy = ref<SortByItem[]>(initialSortBy);
  const pagination = ref<PaginationState>({ ...initialPagination });
  const activeTab = ref<string | null>(initialTab);

  watch([filters, sortBy, pagination, activeTab], updateQuery, { deep: true });

  watch(() => route.query, () => {
    updateStateFromQuery();
  }, { deep: true });

  onMounted(() => {
    updateStateFromQuery();
    updateQuery();
  });

  return {
    filters,
    sortBy,
    pagination,
    activeTab,
    updateQuery
  };

  function updateStateFromQuery(): void {
    const query = route.query;

    Object.keys(initialFilters).forEach(key => {
      const queryKey = `filters[${key}]`;
      if (query[queryKey] !== undefined) {
        const value = query[queryKey];

        if (Array.isArray(initialFilters[key])) {
          filters.value[key] = Array.isArray(value) ? value : [value];
        } else if (typeof initialFilters[key] === 'boolean') {
          filters.value[key] = value === 'true';
        } else {
          filters.value[key] = value;
        }
      }
    });

    if (query.sortBy && query.sortOrder) {
      sortBy.value = [{ key: query.sortBy as string, order: query.sortOrder as string }];
    }

    if (query.page) {
      pagination.value.page = query.page;
    }
    if (query.itemsPerPage) {
      pagination.value.itemsPerPage = query.itemsPerPage;
    }
    if (query.tab) {
      activeTab.value = query.tab as string;
    }
  }

  function updateQuery(): void {
    const currentQuery = { ...route.query };
    const newQuery: Record<string, any> = { ...currentQuery };

    Object.entries(filters.value).forEach(([key, value]) => {
      const queryKey = `filters[${key}]`;
      if (Array.isArray(value)) {
        if (value.length > 0) {
          newQuery[queryKey] = value;
        } else {
          delete newQuery[queryKey];
        }
      } else if (value !== '' && value !== null && value !== undefined) {
        newQuery[queryKey] = value.toString();
      } else {
        delete newQuery[queryKey];
      }
    });

    if (sortBy.value.length > 0) {
      const { key, order } = sortBy.value[0];
      newQuery.sortBy = key;
      newQuery.sortOrder = order;
    } else {
      delete newQuery.sortBy;
      delete newQuery.sortOrder;
    }

    if (pagination.value?.page) {
      newQuery.page = pagination.value.page;
    }
    if (pagination.value?.itemsPerPage) {
      newQuery.itemsPerPage = pagination.value.itemsPerPage;
    }

    if (activeTab.value) {
      newQuery.tab = activeTab.value;
    } else {
      delete newQuery.tab;
    }

    if (JSON.stringify(currentQuery) !== JSON.stringify(newQuery)) {
      router.replace({ query: newQuery });
    }
  }
}