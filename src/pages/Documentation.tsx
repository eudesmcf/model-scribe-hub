
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Download,
  FileSymlink,
  Filter,
  FolderOpen,
  Package,
  Link as LinkIcon,
  Search,
  Table as TableIcon
} from "lucide-react";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

interface ModelInfo {
  name: string;
  description: string;
  type: string;
  lastUpdated: string;
}

interface TableInfo {
  name: string;
  description: string;
  columns: Column[];
}

interface Column {
  name: string;
  dataType: string;
  description: string;
}

interface MeasureInfo {
  name: string;
  description: string;
  expression: string;
  formatString: string;
}

interface RelationshipInfo {
  name: string;
  fromTable: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
  relationType: string;
}

// Mock data
const modelInfo: ModelInfo = {
  name: "Sales Analytics",
  description: "This model contains sales data across different regions and products, with measures for revenue, profit, and growth analysis.",
  type: "Tabular Model",
  lastUpdated: "April 20, 2025",
};

const tables: TableInfo[] = [
  {
    name: "DimCustomer",
    description: "Customer dimension table containing customer attributes",
    columns: [
      { name: "CustomerID", dataType: "Int", description: "Unique identifier for customer" },
      { name: "CustomerName", dataType: "String", description: "Full name of customer" },
      { name: "CustomerType", dataType: "String", description: "Type of customer (Retail, Wholesale, etc.)" },
      { name: "CustomerRegion", dataType: "String", description: "Geographic region of customer" },
      { name: "CustomerSegment", dataType: "String", description: "Market segment of customer" },
    ],
  },
  {
    name: "DimProduct",
    description: "Product dimension table containing product attributes",
    columns: [
      { name: "ProductID", dataType: "Int", description: "Unique identifier for product" },
      { name: "ProductName", dataType: "String", description: "Name of the product" },
      { name: "ProductCategory", dataType: "String", description: "Category of the product" },
      { name: "ProductSubcategory", dataType: "String", description: "Subcategory of the product" },
      { name: "ProductCost", dataType: "Decimal", description: "Cost of producing the product" },
      { name: "ProductPrice", dataType: "Decimal", description: "Retail price of the product" },
    ],
  },
  {
    name: "FactSales",
    description: "Sales fact table containing individual sales transactions",
    columns: [
      { name: "SalesID", dataType: "Int", description: "Unique identifier for sales transaction" },
      { name: "CustomerID", dataType: "Int", description: "Foreign key to DimCustomer" },
      { name: "ProductID", dataType: "Int", description: "Foreign key to DimProduct" },
      { name: "DateID", dataType: "Int", description: "Foreign key to DimDate" },
      { name: "Quantity", dataType: "Int", description: "Quantity of products sold" },
      { name: "Revenue", dataType: "Decimal", description: "Revenue from the sale" },
      { name: "Discount", dataType: "Decimal", description: "Discount applied to the sale" },
    ],
  },
];

const measures: MeasureInfo[] = [
  {
    name: "Total Revenue",
    description: "Sum of revenue across all sales",
    expression: "SUM(FactSales[Revenue])",
    formatString: "$#,##0.00",
  },
  {
    name: "Total Quantity",
    description: "Sum of quantity across all sales",
    expression: "SUM(FactSales[Quantity])",
    formatString: "#,##0",
  },
  {
    name: "Average Revenue Per Sale",
    description: "Average revenue per sale",
    expression: "DIVIDE(SUM(FactSales[Revenue]), COUNTROWS(FactSales))",
    formatString: "$#,##0.00",
  },
  {
    name: "Profit",
    description: "Calculated profit based on revenue and product cost",
    expression: "SUM(FactSales[Revenue]) - SUMX(FactSales, FactSales[Quantity] * RELATED(DimProduct[ProductCost]))",
    formatString: "$#,##0.00",
  },
  {
    name: "Profit Margin",
    description: "Profit as a percentage of revenue",
    expression: "DIVIDE([Profit], [Total Revenue])",
    formatString: "0.00%",
  },
];

const relationships: RelationshipInfo[] = [
  {
    name: "Customer to Sales",
    fromTable: "DimCustomer",
    fromColumn: "CustomerID",
    toTable: "FactSales",
    toColumn: "CustomerID",
    relationType: "One-to-Many",
  },
  {
    name: "Product to Sales",
    fromTable: "DimProduct",
    fromColumn: "ProductID",
    toTable: "FactSales",
    toColumn: "ProductID",
    relationType: "One-to-Many",
  },
  {
    name: "Date to Sales",
    fromTable: "DimDate",
    fromColumn: "DateID",
    toTable: "FactSales",
    toColumn: "DateID",
    relationType: "One-to-Many",
  },
];

const Documentation = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    table.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    table.columns.some(col => 
      col.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      col.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  const filteredMeasures = measures.filter(measure =>
    measure.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    measure.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    measure.expression.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">{modelInfo.name} Documentation</h1>
            <p className="text-muted-foreground mt-1">{modelInfo.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FolderOpen className="h-4 w-4 mr-2" />
              Open Model
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Documentation
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Model Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Model Type</h3>
                  <p className="text-base">{modelInfo.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
                  <p className="text-base">{modelInfo.lastUpdated}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Tables</h3>
                  <p className="text-base">{tables.length}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Measures</h3>
                  <p className="text-base">{measures.length}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Relationships</h3>
                  <p className="text-base">{relationships.length}</p>
                </div>
              </div>

              <div className="relative flex mt-6">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search documentation..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b p-0 h-auto">
                  <TabsTrigger
                    value="overview"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="tables"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                  >
                    Tables
                  </TabsTrigger>
                  <TabsTrigger
                    value="measures"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                  >
                    Measures
                  </TabsTrigger>
                  <TabsTrigger
                    value="relationships"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                  >
                    Relationships
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-medium mb-3">Model Overview</h2>
                      <p className="text-muted-foreground">
                        The {modelInfo.name} model is a tabular model designed for analyzing sales performance across different 
                        dimensions such as customers, products, and time periods. It provides insights into revenue, 
                        profitability, and sales growth.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Key Components</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <TableIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Dimension Tables</p>
                            <p className="text-muted-foreground">Customer, Product, and Date dimension tables for slicing data.</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Package className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Fact Tables</p>
                            <p className="text-muted-foreground">Sales fact table containing transaction-level data.</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <FileSymlink className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Calculated Measures</p>
                            <p className="text-muted-foreground">KPIs including revenue, profit, and profit margins.</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <LinkIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Relationships</p>
                            <p className="text-muted-foreground">Connections between dimension and fact tables.</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Usage Guidelines</h3>
                      <p className="text-muted-foreground">
                        This model is optimized for Power BI and SQL Server Analysis Services. It supports both 
                        directQuery and import modes, with recommended refresh schedules of once per day for 
                        the full model or hourly for incremental refreshes of the sales fact table.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tables" className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium">Tables</h2>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                  {filteredTables.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No tables match your search.</p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[calc(100vh-300px)] pr-4 tabular-scrollbar">
                      <div className="space-y-6">
                        {filteredTables.map((table) => (
                          <div key={table.name} className="rounded-lg border p-4">
                            <h3 className="text-lg font-medium mb-1">{table.name}</h3>
                            <p className="text-muted-foreground mb-4">{table.description}</p>
                            <h4 className="text-sm font-medium mb-2 text-muted-foreground">Columns</h4>
                            <div className="space-y-3">
                              {table.columns.map((column) => (
                                <div key={column.name} className="bg-muted/50 p-3 rounded-md">
                                  <div className="flex justify-between">
                                    <span className="font-medium">{column.name}</span>
                                    <span className="text-sm text-muted-foreground px-2 py-0.5 bg-muted rounded">
                                      {column.dataType}
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {column.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </TabsContent>

                <TabsContent value="measures" className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium">Measures</h2>
                  </div>
                  {filteredMeasures.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No measures match your search.</p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[calc(100vh-300px)] pr-4 tabular-scrollbar">
                      <div className="space-y-4">
                        {filteredMeasures.map((measure) => (
                          <Accordion
                            type="single" 
                            collapsible
                            key={measure.name}
                            className="border rounded-md"
                          >
                            <AccordionItem value={measure.name} className="border-none">
                              <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 [&[data-state=open]]:bg-muted/50">
                                <div className="flex items-center">
                                  <span className="font-medium">{measure.name}</span>
                                  <span className="text-xs text-muted-foreground ml-3">
                                    {measure.formatString}
                                  </span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="px-4 pb-3 pt-0">
                                <p className="text-muted-foreground mb-3">{measure.description}</p>
                                <div>
                                  <h4 className="text-xs font-medium mb-1 text-muted-foreground">EXPRESSION</h4>
                                  <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm">
                                    {measure.expression}
                                  </pre>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </TabsContent>

                <TabsContent value="relationships" className="p-6">
                  <h2 className="text-xl font-medium mb-6">Relationships</h2>
                  <div className="space-y-4">
                    {relationships.map((rel, index) => (
                      <div key={rel.name} className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">{rel.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted/50 p-3 rounded-md">
                            <h4 className="text-sm font-medium mb-1 text-muted-foreground">From</h4>
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span>Table:</span>
                                <span className="font-medium">{rel.fromTable}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Column:</span>
                                <span className="font-medium">{rel.fromColumn}</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-muted/50 p-3 rounded-md">
                            <h4 className="text-sm font-medium mb-1 text-muted-foreground">To</h4>
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span>Table:</span>
                                <span className="font-medium">{rel.toTable}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Column:</span>
                                <span className="font-medium">{rel.toColumn}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <span className="text-sm text-muted-foreground">Relationship Type: </span>
                          <span className="text-sm font-medium">{rel.relationType}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Documentation;
