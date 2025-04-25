
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import ModelCard from "@/components/dashboard/ModelCard";

// Mock data
const models = [
  {
    id: "1",
    name: "Sales Analytics",
    description: "Comprehensive sales analysis model with regional breakdowns",
    status: "active" as const,
    tablesCount: 12,
    measuresCount: 34,
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    name: "Financial Dashboard",
    description: "Financial reporting and analysis model",
    status: "active" as const,
    tablesCount: 8,
    measuresCount: 26,
    lastUpdated: "3 days ago",
  },
  {
    id: "3",
    name: "Customer Analytics",
    description: "Customer behavior and segmentation analysis",
    status: "warning" as const,
    tablesCount: 7,
    measuresCount: 18,
    lastUpdated: "5 days ago",
  },
  {
    id: "4",
    name: "HR Dashboard",
    description: "Human resources metrics and analytics",
    status: "inactive" as const,
    tablesCount: 5,
    measuresCount: 15,
    lastUpdated: "2 weeks ago",
  },
  {
    id: "5",
    name: "Marketing Analytics",
    description: "Marketing campaign performance tracking",
    status: "active" as const,
    tablesCount: 10,
    measuresCount: 22,
    lastUpdated: "4 days ago",
  },
  {
    id: "6",
    name: "Supply Chain Analytics",
    description: "Supply chain performance and optimization model",
    status: "active" as const,
    tablesCount: 9,
    measuresCount: 28,
    lastUpdated: "1 week ago",
  },
  {
    id: "7",
    name: "Product Performance",
    description: "Product sales and profitability analysis",
    status: "warning" as const,
    tablesCount: 6,
    measuresCount: 20,
    lastUpdated: "10 days ago",
  },
  {
    id: "8",
    name: "Inventory Management",
    description: "Inventory levels and turnover analysis",
    status: "inactive" as const,
    tablesCount: 4,
    measuresCount: 12,
    lastUpdated: "3 weeks ago",
  },
];

const Models = () => {
  return (
    <Layout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Tabular Models</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Model
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-medium">Browse Models</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search"
                  placeholder="Search models..."
                  className="pl-8 w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <Tabs defaultValue="grid" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-sm text-muted-foreground mr-4">Display:</span>
                  <TabsList>
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                  </TabsList>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground mr-2">Showing:</span>
                  <span className="text-sm font-medium">{models.length} models</span>
                </div>
              </div>

              <TabsContent value="grid" className="mt-0">
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {models.map((model) => (
                    <ModelCard key={model.id} {...model} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="list" className="mt-0">
                <div className="space-y-3">
                  {models.map((model) => (
                    <div 
                      key={model.id}
                      className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <h3 className="font-medium">{model.name}</h3>
                        <p className="text-sm text-muted-foreground">{model.description}</p>
                        <div className="flex gap-4 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {model.tablesCount} Tables
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {model.measuresCount} Measures
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Updated {model.lastUpdated}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Models;
