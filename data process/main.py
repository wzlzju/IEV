import os
import csv
import json
from copy import deepcopy
from pycountry_convert import country_alpha2_to_continent_code

dataselect = "92"
rawdatadirpath = "../cepii data/BACI_HS"+dataselect+"_V202102/"
resultdirpath = "../cepii data/"+dataselect+"data/"
countrypath = "../cepii data/country_codes_V202102.csv"
productspath = "../cepii data/product_codes_HS"+dataselect+"_V202102.csv"
reporterreliabilitypath = "../cepii data/reporter_reliability_V202102/reporter_reliability_HS"+dataselect+"_V202102.csv"
zerospath = "../cepii data/zeros_V202102/zeros_HS"+dataselect+"_V202102.csv"
tmpdir = "../cepii data/tmp/"

def dataProcess():
    pass

def processCountries():
    with open(countrypath, "r") as f:
        f_csv = csv.reader(f)
        ret = {}
        headerflag = True
        for row in f_csv:
            if headerflag:
                headerflag = False
                header = row.copy()
                continue
            if row[0] == "516":
                ret[row[0]] = {header[1]: row[1],
                               header[2]: row[2],
                               header[3]: "NA",
                               header[4]: row[4],
                               "continent": country_alpha2_to_continent_code("NA")}
            elif row[0] == "490":
                ret[row[0]] = {header[1]: row[1],
                               header[2]: row[2],
                               header[3]: row[3],
                               header[4]: row[4],
                               "continent": "AS"}
            elif row[0] == "697":
                ret[row[0]] = {header[1]: row[1],
                               header[2]: row[2],
                               header[3]: row[3],
                               header[4]: row[4],
                               "continent": "EU"}
            elif row[0] == "849":
                ret[row[0]] = {header[1]: row[1],
                               header[2]: row[2],
                               header[3]: row[3],
                               header[4]: row[4],
                               "continent": "N/A"}
            elif row[0] == "891":
                ret[row[0]] = {header[1]: row[1],
                               header[2]: row[2],
                               header[3]: row[3],
                               header[4]: row[4],
                               "continent": "EU"}
            elif row[0] == "200":
                ret[row[0]] = {header[1]: row[1],
                               header[2]: row[2],
                               header[3]: row[3],
                               header[4]: row[4],
                               "continent": "EU"}
            elif row[0] == "260":
                ret[row[0]] = {header[1]: row[1],
                               header[2]: row[2],
                               header[3]: row[3],
                               header[4]: row[4],
                               "continent": "SP"}
            elif row[0] == "278" or row[0] == "280":
                ret[row[0]] = {header[1]: row[1],
                               header[2]: row[2],
                               header[3]: row[3],
                               header[4]: row[4],
                               "continent": "EU"}
            elif row[0] == "530":
                ret[row[0]] = {header[1]: row[1],
                               header[2]: row[2],
                               header[3]: row[3],
                               header[4]: row[4],
                               "continent": "NA"}
            elif row[0] == "534":
                ret[row[0]] = {header[1]: row[1],
                               header[2]: row[2],
                               header[3]: row[3],
                               header[4]: row[4],
                               "continent": "NA"}
            elif row[0] == "612":
                ret[row[0]] = {header[1]: row[1],
                               header[2]: row[2],
                               header[3]: row[3],
                               header[4]: row[4],
                               "continent": "OC"}
            elif row[0] == "626":
                ret[row[0]] = {header[1]: row[1],
                               header[2]: row[2],
                               header[3]: row[3],
                               header[4]: row[4],
                               "continent": "AS"}
            elif row[0] == "810":
                ret[row[0]] = {header[1]: row[1],
                               header[2]: row[2],
                               header[3]: row[3],
                               header[4]: row[4],
                               "continent": "EU"}
            else:
                ret[row[0]] = {header[1]: row[1],
                            header[2]: row[2],
                            header[3]: row[3],
                            header[4]: row[4],
                            "continent": country_alpha2_to_continent_code(row[3])}
    with open(tmpdir+"countries.json", "w") as f:
        json.dump(ret, f)

def getCountries():
    with open(countrypath, "r") as f:
        f_csv = csv.reader(f)
        ret = {}
        headerflag = True
        for row in f_csv:
            if headerflag:
                headerflag = False
                header = row.copy()
                continue
            ret[row[0]] = {header[1]: row[1],
                           header[2]: row[2],
                           header[3]: row[3],
                           header[4]: row[4]}
    return ret

def testDataProcessTmp():
    cdir = "textile raw materials/"
    countries = getCountries()
    hscode = list(range(50, 57))
    rawdatafiles = os.listdir(rawdatadirpath)
    trade = {}
    itotal = {}
    jtotal = {}
    for df in rawdatafiles:
        cdf = rawdatadirpath+df
        year = df.split('Y')[1][:4]
        ytrade = {}
        yi = {cc:0. for cc in countries.keys()}
        yj = {cc:0. for cc in countries.keys()}
        print(cdf)
        with open(cdf, "r") as f:
            f_csv = csv.reader(f)
            for row in f_csv:
                if len(row[3]) < 5:
                    continue
                chs = int(row[3][-6:-4])
                if chs not in hscode:
                    continue
                i, j, v = row[1], row[2], float(row[4])
                if i+' '+j not in ytrade:
                    ytrade[i+' '+j] = 0.
                ytrade[i+' '+j] += v
                yi[i] += v
                yj[j] += v

        trade[year] = ytrade
        itotal[year] = yi
        jtotal[year] = yj
        csf = tmpdir+cdir+"year data/"+str(hscode[0])+"-"+str(hscode[-1])+"_data_HS"+dataselect+"_Y"+year+"_V202102.json"
        with open(csf, "w") as f:
            json.dump({"trade": ytrade,
                       "exportsum": yi,
                       "importsum": yj}, f)
    with open(tmpdir+cdir+"total data/"+str(hscode[0])+"-"+str(hscode[-1])+"_trade_data_HS"+dataselect+"_V202102.json", "w") as f:
        json.dump(trade, f)
    with open(tmpdir+cdir+"total data/"+str(hscode[0])+"-"+str(hscode[-1])+"_export_data_HS"+dataselect+"_V202102.json", "w") as f:
        json.dump(itotal, f)
    with open(tmpdir+cdir+"total data/"+str(hscode[0])+"-"+str(hscode[-1])+"_import_data_HS"+dataselect+"_V202102.json", "w") as f:
        json.dump(jtotal, f)

def getIntermediateResults():
    cdir = "textile/"
    with open(tmpdir+"countries.json", "r") as f:
        raw_countries = json.load(f)
    tmpds = os.listdir(tmpdir+cdir+"year data/")
    all_years_countries = {}
    for tmpd in tmpds:
        countries = deepcopy(raw_countries)
        cfilename = tmpd.replace("data", "countries-trades")
        year = tmpd.split("Y")[1][:4]
        print(tmpdir+cdir+"year data/"+tmpd)
        with open(tmpdir+cdir+"year data/"+tmpd, "r") as f:
            cd = json.load(f)
        trade = cd["trade"]
        exports = cd["exportsum"]
        imports = cd["importsum"]
        for cc in countries.keys():
            countries[cc]["expsum"] = exports[cc]
            countries[cc]["impsum"] = imports[cc]
            expl = []
            impl = []
            for tr in trade.keys():
                i = tr.split(" ")[0]
                j = tr.split(" ")[1]
                if i == cc:
                    expl.append((j, trade[tr]))
                if j == cc:
                    impl.append((i, trade[tr]))
            expl.sort(key=lambda x: x[1], reverse=True)
            impl.sort(key=lambda x: x[1], reverse=True)
            countries[cc]["explist"] = expl
            countries[cc]["implist"] = impl
        with open(tmpdir+cdir+"countries-trades/"+cfilename, "w") as f:
            json.dump(countries, f)
        all_years_countries[year] = countries
    cfilename = cfilename.split("Y")[0]+"total"+tmpd.split("Y")[1][4:]
    with open(tmpdir+cdir+"countries-trades/"+cfilename, "w") as f:
        json.dump(all_years_countries, f)



if __name__ == "__main__":
    #testDataProcessTmp()
    #processCountries()
    getIntermediateResults()