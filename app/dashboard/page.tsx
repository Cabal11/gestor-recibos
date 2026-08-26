import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardPage() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3 max-h-0.5">
          {/* Primer card */}
          <Card className="aspect-video rounded-xl bg-muted/50 text-3xl text-center">
            <CardHeader>
              <CardTitle className="text-3xl">Junio</CardTitle>
              <CardDescription className="text-2xl">
                Total gastado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>$1800</p>
            </CardContent>
          </Card>
          {/* Segundo card */}
          <Card className="aspect-video rounded-xl bg-muted/50 text-3xl text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Recibos pagados</CardTitle>
              <CardDescription className="text-2xl">Cantidad</CardDescription>
            </CardHeader>
            <CardContent>
              <p>7</p>
            </CardContent>
          </Card>
          {/* Tercer card */}
          <Card className="aspect-video rounded-xl bg-muted/50 text-3xl text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Mes pasado</CardTitle>
              <CardDescription className="text-2xl">
                Total gastado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>$4000</p>
            </CardContent>
          </Card>
          {/* <div className="aspect-video rounded-xl bg-muted/50" /> */}
        </div>
        {/* <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
      </div>
    </>
  );
}
