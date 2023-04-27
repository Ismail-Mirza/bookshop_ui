import React, { createContext, useState, useEffect } from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Shop from './Components/Shop/Shop';
import SecondaryNav from './Components/SecondaryNav/SecondaryNav';
import Footer from './Components/Footer/Footer';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getDatabaseCart } from './Components/LocalStorageManager/LocalStorageManager';
import SignUp from './Components/SignUp/SignUp';
import Auth from './Components/Login/use-auth';
import EmailVerification from './Components/VerifyEmail/VerifyEmail';
import Loading from './Components/Loading/Loading';
import Shipment from './Components/Shipment/Shipment';
import ViewMore from './Components/ViewMore/ViewMore';
import SearchRes from './Components/SearchRes/SearchRes';
import Orders from './Components/Orders/Orders';
import OrderDetails from './Components/OrderDetails/OrderDetails';

export const AllBooksContext = createContext();
export const CartContext = createContext();
export const LoadingContext = createContext();
export const AuthContext = createContext();
export const ViewMoreContext = createContext();
export const SearchContext = createContext();
export const OrderContext = createContext();

function App() {
  const [cart, setCart] = useState([])
  const [allBooks, setAllBooks] = useState([]);
      
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [emailVerified, setEmailVerified] = useState();
  const [viewMore, setViewMore] = useState(null);
  const [search, setSearch] = useState(null);
  const auth = Auth();

  useEffect(() => {
    if (auth.user) {
      setEmailVerified(auth.user.emailVerified);
      setLoading1(false);
    }
    else {
      setTimeout(() => { setLoading1(false) }, 2000)
    }
  }, [auth.user]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    if (allBooks.length) {
      const previousCart = productKeys.map(existingKey => {
        const book = allBooks.find(book => book._id === existingKey);
        book.quantity = savedCart[existingKey];
        return book;
      })
      setCart(previousCart);
    }
  }, [allBooks, setCart, orders])

  useEffect(() => {
    fetch("http://localhost:4000/allBooks")
      .then(res => res.json())
      .then(data => {
        const fetchedData = data.reverse()
        setAllBooks(fetchedData);
        fetch("http://localhost:4000/orders")
          .then(res => res.json())
          .then(data => {
            const fetchedData = data.reverse()
            setOrders(fetchedData);
            setLoading(false);
          });
      });
  }, []);

  let routs;
  if (loading1) {
    routs = (
      <Switch>
        <Route path="/login">
          <Loading></Loading>
        </Route>
        <Route path="/signUp">
          <Loading></Loading>
        </Route>
      </Switch>
    )
  }
  else if (loading) {
    routs = (
      <Switch>
        <Route path="/orders">
          <Loading></Loading>
        </Route>
        <Route path="/search=:search">
          <Loading></Loading>
        </Route>
        <Route path="/more/:viewMore">
          <Loading></Loading>
        </Route>
        <Route path="/productDetails/:id">
          <Loading></Loading>
        </Route>
        <Route exact path="/">
          <Loading></Loading>
        </Route>
        <Route path="/orderDetails/:id">
          <Loading></Loading>
        </Route>
      </Switch>
    )
  }
  else if (!auth.user) {
    routs = (
      <Switch>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/signUp">
          <SignUp></SignUp>
        </Route>
        <Route path="/orders">
          <Login></Login>
        </Route>
        <Route path="/shipment">
          <Login></Login>
        </Route>
        <Route path="/orderDetails/:id">
          <Login></Login>
        </Route>
        <Route path="/search=:search">
          <NavBar></NavBar>
          <SecondaryNav></SecondaryNav>
          <SearchRes></SearchRes>
          <Footer></Footer>
        </Route>
        <Route path="/more/:viewMore">
          <NavBar></NavBar>
          <SecondaryNav></SecondaryNav>
          <ViewMore></ViewMore>
          <Footer></Footer>
        </Route>
        <Route path="/productDetails/:id">
          <NavBar></NavBar>
          <SecondaryNav></SecondaryNav>
          <ProductDetails></ProductDetails>
          <Footer></Footer>
        </Route>
        <Route exact path="/">
          <NavBar></NavBar>
          <SecondaryNav></SecondaryNav>
          <Shop></Shop>
          <Footer></Footer>
        </Route>
      </Switch>
    )
  }
  else if (auth.user && !emailVerified) {
    routs = (
      <Switch>
        <Route path="/login">
          <EmailVerification></EmailVerification>
        </Route>
        <Route path="/signUp">
          <EmailVerification></EmailVerification>
        </Route>
        <Route path="/orders">
          <EmailVerification></EmailVerification>
        </Route>
        <Route path="/shipment">
          <EmailVerification></EmailVerification>
        </Route>
        <Route path="/orderDetails/:id">
          <EmailVerification></EmailVerification>
        </Route>
        <Route path="/search=:search">
          <NavBar></NavBar>
          <SecondaryNav></SecondaryNav>
          <SearchRes></SearchRes>
          <Footer></Footer>
        </Route>
        <Route path="/more/:viewMore">
          <NavBar></NavBar>
          <SecondaryNav></SecondaryNav>
          <ViewMore></ViewMore>
          <Footer></Footer>
        </Route>
        <Route path="/productDetails/:id">
          <NavBar></NavBar>
          <SecondaryNav></SecondaryNav>
          <ProductDetails></ProductDetails>
          <Footer></Footer>
        </Route>
        <Route exact path="/">
          <NavBar></NavBar>
          <SecondaryNav></SecondaryNav>
          <Shop></Shop>
          <Footer></Footer>
        </Route>
      </Switch>
    )
  }
  else if (auth.user && emailVerified) {
    routs = (
      <Switch>
        <Route path="/login">
          <NavBar></NavBar>
          <SecondaryNav></SecondaryNav>
          <Shop></Shop>
          <Footer></Footer>
        </Route>
        <Route path="/signUp">
          <NavBar></NavBar>
          <SecondaryNav></SecondaryNav>
          <Shop></Shop>
          <Footer></Footer>
        </Route>
        <Route path="/orders">
          <NavBar></NavBar>
          <SecondaryNav></SecondaryNav>
          <Orders></Orders>
          <Footer></Footer>
        </Route>
        <Route path="/shipment">
          <NavBar></NavBar>
          <SecondaryNav></SecondaryNav>
          <Shipment></Shipment>
          <Footer></Footer>
        </Route>
        <Route path="/orderDetails/:id">
          <NavBar></NavBar>
          <SecondaryNav></SecondaryNav>
          <OrderDetails></OrderDetails>
          <Footer></Footer>
        </Route>
        <Route path="/search=:search">
          <NavBar></NavBar>
          <SecondaryNav></SecondaryNav>
          <SearchRes></SearchRes>
          <Footer></Footer>
        </Route>
        <Route path="/more/:viewMore">
          <NavBar></NavBar>
          <SecondaryNav></SecondaryNav>
          <ViewMore></ViewMore>
          <Footer></Footer>
        </Route>
        <Route path="/productDetails/:id">
          <NavBar></NavBar>
          <SecondaryNav></SecondaryNav>
          <ProductDetails></ProductDetails>
          <Footer></Footer>
        </Route>
        <Route exact path="/">
          <NavBar></NavBar>
          <SecondaryNav></SecondaryNav>
          <Shop></Shop>
          <Footer></Footer>
        </Route>
      </Switch>
    )
  }

  return (
    <div>
      <OrderContext.Provider value={[orders, setOrders]}>
        <LoadingContext.Provider value={loading}>
          <CartContext.Provider value={[cart, setCart]}>
            <AllBooksContext.Provider value={allBooks}>
              <ViewMoreContext.Provider value={[viewMore, setViewMore]}>
                <SearchContext.Provider value={[search, setSearch]}>
                  <Router>
                    <Switch>
                      <Route path="/cart">
                        <NavBar></NavBar>
                        <SecondaryNav></SecondaryNav>
                        <Cart></Cart>
                        <Footer></Footer>
                      </Route>
                    </Switch>
                    {routs}
                  </Router>
                </SearchContext.Provider>
              </ViewMoreContext.Provider>
            </AllBooksContext.Provider>
          </CartContext.Provider>
        </LoadingContext.Provider>
      </OrderContext.Provider>
    </div>
  );
}

export default App;
