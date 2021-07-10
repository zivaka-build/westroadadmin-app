import React from "react";
import Voucher from "../components/Dashboard/Voucher"
import { Redirect} from "@reach/router"
import Cookies from 'js-cookie';

function VoucherPage() {
    if( Cookies.get('Token') === undefined ) {
        return <Redirect to="/loginfirst" noThrow />
    }
      else {
      return <Voucher />;
      }
}

export default VoucherPage;