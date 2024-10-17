import CustomAvatar from "@/components/custom-avatar";
import { Text } from "@/components/text";
import { COMPANIES_LIST_QUERY } from "@/graphql/queries";
import { Company } from "@/graphql/schema.types";

import { CompaniesListQuery } from "@/graphql/types";
import { currencyNumber } from "@/utilities";
import { SearchOutlined } from "@ant-design/icons";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  useTable,
} from "@refinedev/antd";
import { HttpError, getDefaultFilter, useGo } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { Input, Space, Table } from "antd";

import { ColumnProps } from "antd/es/table";

export const CompanyList = ({ children }: React.PropsWithChildren) => {
  const go = useGo();
  const { tableProps, filters } = useTable<
    GetFieldsFromList<CompaniesListQuery>,
    HttpError,
    GetFieldsFromList<CompaniesListQuery>
  >({
    resource: "companies",
    onSearch: (values) => {
      return [
        {
          field: "name",
          operator: "contains",
          value: values.name,
        },
      ];
    },
    pagination: {
      pageSize: 12,
    },
    sorters: {
      initial: [
        {
          field: "createdAt",
          order: "desc",
        },
      ],
    },
    filters: {
      initial: [
        {
          field: "name",
          operator: "contains",
          value: undefined,
        },
      ],
    },
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY,
    },
  });

  const columns: ColumnProps<Company>[] = [
    {
      key: "name",
      dataIndex: "name",
      title: "Company Title",
      render: (value, record) => (
        <Space>
          <CustomAvatar
            shape="square"
            name={record.name}
            src={record.avatarUrl}
          />
          <Text style={{ whiteSpace: "nowrap" }}>{record.name}</Text>
        </Space>
      ),
    },
    {
      key: "totalRevenue",
      dataIndex: "totalRevenue",
      title: "Open deals amount",
      render: (value, company) => (
        <Text>
          {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
        </Text>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (_, record) => (
        <Space>
          <EditButton hideText size="small" recordItemId={record.id} />
          <DeleteButton hideText size="small" recordItemId={record.id} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            onClick={() => {
              go({
                to: {
                  resource: "companies",
                  action: "create",
                },
                options: {
                  keepQuery: true,
                },
                type: "replace",
              });
            }}
          />
        )}
      >
        <Table
          {...tableProps}
          columns={columns}
          pagination={tableProps.pagination}
        />
      </List>
      {children}
    </div>
  );
};
