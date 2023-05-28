import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages/public/slide-show/slide-show.page").then(
        (m) => m.SlideShowPage
      ),
  },
  {
    path: "login",
    loadComponent: () =>
      import("./pages/public/login/login.page").then((m) => m.LoginPage),
  },
  {
    path: "modal",
    loadComponent: () =>
      import("./pages/auth/modal/modal.page").then((m) => m.ModalPage),
  },
  {
    path: "info-modal",
    loadComponent: () =>
      import("./pages/auth/info-modal/info-modal.page").then(
        (m) => m.InfoModalPage
      ),
  },
  {
    path: "tabs",
    loadComponent: () =>
      import("./pages/tabs/tabs.page").then((m) => m.TabsPage),
    children: [
      {
        path: "home",
        loadComponent: () =>
          import("./pages/auth/home/home.page").then((m) => m.HomePage),
      },
      {
        path: "home/account",
        loadComponent: () =>
          import("./pages/auth/account/account.page").then(
            (m) => m.AccountPage
          ),
      },
      {
        path: "home/details/:id",
        loadComponent: () =>
          import("./pages/auth/details/details.page").then(
            (m) => m.DetailsPage
          ),
      },
      {
        path: "coming-soon",
        loadComponent: () =>
          import("./pages/auth/coming-soon/coming-soon.page").then(
            (m) => m.ComingSoonPage
          ),
      },
      {
        path: "search",
        loadComponent: () =>
          import("./pages/auth/search/search.page").then((m) => m.SearchPage),
      },
      {
        path: "downloads",
        loadComponent: () =>
          import("./pages/auth/downloads/downloads.page").then(
            (m) => m.DownloadsPage
          ),
      },
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
    ],
  },
];
