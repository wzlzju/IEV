# IEV
Industrial Economics Visualization

## Intial code description

### cepii data

数据目录

数据为cepii的贸易数据，有点大，需自行到[BACI](http://cepii.fr/CEPII/en/bdd_modele/presentation.asp?id=37)网站下载。可以先只下载HS92的贸易数据、Country codes。数据说明在网站的[documentation](http://www.cepii.fr/DATA_DOWNLOAD/baci/doc/DescriptionBACI.html)中。

cepii data/tmp里存放了一些早期处理好的数据，用来测试效果。其中：

- countries.json

	国家信息处理得到的json文件

- textile/

	纺织品贸易数据，由Harmonized System(HS)的第11类57-63章组成（关于HS编码系统的详细解释见[HS编码 - 百度百科](https://baike.baidu.com/item/HS%E7%BC%96%E7%A0%81/1532725?fr=aladdin)）

	- total data/

		按照进口价值、出口价值、具体贸易流保存数据，每份数据中包含有1995-2019所有的数据

	- year data/

		按照年份分别保存数据，每份数据中包含有当年的进口价值、出口价值、具体贸易流
	
	- countries-trades/

		从year data/处理得到的结果，用于test/中的demo进行测试。其中*_total_*.json是将所有年份的数据保存在一个文件中

- textile raw materials/

	纺织品原材料贸易数据，由Harmonized System(HS)的第11类50-56章组成

	暂未处理countries-trades/的结果，其余与textile/目录下的文件相同

### data process

数据处理

这一部分的实现只做参考，具体要考虑前端的数据需求
用到了`pycountry-convert`库，用于获取国家所在的洲

- main.py

	里面具体实现了三个测试用函数

	- `testDataProcessTmp()`

		处理原始数据BACI\_HS92\_V202102/，得到year data/和total data/中的结果

	- `processCountries()`

		处理country\_codes\_V202102.csv，得到countries.json

	- `getIntermediateResults()`

		处理year data/，得到countries-trades/中的结果

### test

demo测试

目前只测试了动态力引导图的效果

数据使用的是cepii data/tmp/textile/countries-trades/57-63_countries-trades_HS92_total_V202102.json

因为是测试用的demo，就简单写了一个html

浏览器可能要跨域访问

效果不太好看，需要再调

- testfd-t1.html

	用的是v3版本的d3，双击切换到下一年

- testfd.html

	用的v4版本的d3，不过有些bug

- testdfg.html

	动态力引导图的参考


