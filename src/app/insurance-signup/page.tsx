"use client"

import React, {Fragment} from 'react'
import NextImage from "@/components/NextImage";
import {ContextMenu} from "@/components/contextMenu";
import Link from "next/link";
import {  Wrench, DollarSign, FileText, PhoneCall, Users, Shield,  FileCheck2, AlertTriangle } from 'lucide-react';
import {ROUTES} from "@/lib/constants";
import {SteppedContactSection} from "@/components/step-form/steppedContactSection";
import ManualBimeRegister from "@/components/ManualBimeRegister2";



export default function Page() {


    return (<>


            <ManualBimeRegister/>

        </>

    );
}
