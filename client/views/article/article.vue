<template>
	<div>
		<el-row class="main" type="flex" justify="center">
			<el-col :span="16">
				<div id="artcle-info">
					<h2 class="text-center"><strong>{{EssayOne.title}}</strong></h2>
					<!-- 描述：文章信息 -->
					<div class="text-center timeAndView">
						<span class="article-time">
							<i class="el-icon-time"></i>
							发表于：<span>{{EssayOne.meta.createdAt | dateFrm}}</span>
						</span>
						&nbsp;|&nbsp;
						<span class="article-views">
							<i class="el-icon-view"></i>
							阅读量：<span>{{EssayOne.pageview}}</span>万
						</span>
					</div>
					<p class="abstract">
						{{EssayOne.outline}}
					</p>
				</div>
				<hr />
				<div id="artcle-content">
                    {{EssayOne.content}}
					<!-- <p>官方地址：
						
					</p>

					<p>springboot整合非常简单，易学易用，步骤如下：</p>

					<p>&nbsp;</p>

					<h3><a name="t0"></a>1、pom.xml所需依赖</h3>
                    <div class="blockquote">
                        <pre class="has" name="code" onclick="hljs.signin(event)"><code class="language-html hljs xml"><ol class="hljs-ln"><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-starter-web<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="5"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"> </div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="6"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="7"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>io.springfox<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="8"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>springfox-swagger2<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="9"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>2.8.0<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="10"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="11"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"> </div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="12"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="13"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>io.springfox<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="14"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>springfox-swagger-ui<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="15"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>2.8.0<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="16"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span></div></div></li></ol></code><div class="hljs-button signin" data-title="登录后复制"></div></pre>
                    </div>

					

					<h3>&nbsp;</h3>

					<h3><a name="t2"></a>2、配置swagger2</h3>

					<p><strong>新建Swagger2Config.java文件，在扫包范围内</strong></p>

                    <div class="blockquote">
					<pre class="has" name="code" onclick="hljs.signin(event)">
                        <code class="hljs java"><ol class="hljs-ln" style="width:1043px"><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-meta">@Configuration</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-meta">@EnableSwagger</span>2</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Swagger2Config</span> </span>{</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"> </div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="5"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-meta">@Bean</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="6"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-function"><span class="hljs-keyword">public</span> Docket <span class="hljs-title">createRestApi</span><span class="hljs-params">()</span> </span>{</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="7"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Docket(DocumentationType.SWAGGER_2).produces(Sets.newHashSet(<span class="hljs-string">"application/json"</span>))</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="8"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">                .consumes(Sets.newHashSet(<span class="hljs-string">"application/json"</span>)).protocols(Sets.newHashSet(<span class="hljs-string">"http"</span>, <span class="hljs-string">"https"</span>))</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="9"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">                .apiInfo(apiInfo()).forCodeGeneration(<span class="hljs-keyword">true</span>).useDefaultResponseMessages(<span class="hljs-keyword">false</span>).select()</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="10"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">                <span class="hljs-comment">// 指定controller存放的目录路径</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="11"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">                .apis(RequestHandlerSelectors.basePackage(<span class="hljs-string">"cn.fzy.controller"</span>)).paths(PathSelectors.any()).build();</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="12"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    }</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="13"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"> </div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="14"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-function"><span class="hljs-keyword">private</span> ApiInfo <span class="hljs-title">apiInfo</span><span class="hljs-params">()</span> </span>{</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="15"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> ApiInfoBuilder()</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="16"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">                <span class="hljs-comment">// 文档标题</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="17"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">                .title(<span class="hljs-string">"swagger2测试api文档"</span>)</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="18"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">                <span class="hljs-comment">// 文档描述</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="19"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">                .description(<span class="hljs-string">"这里填写API接口文档简要描述"</span>)</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="20"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">                <span class="hljs-comment">// 系统版本号</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="21"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">                .version(<span class="hljs-string">"v1"</span>).license(<span class="hljs-string">"MIT 协议"</span>).licenseUrl(<span class="hljs-string">"http://www.opensource.org/licenses/MIT"</span>)</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="22"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">                <span class="hljs-comment">// 联系人姓名、网址、邮箱</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="23"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">                .contact(<span class="hljs-keyword">new</span> Contact(<span class="hljs-string">"fzy"</span>, <span class="hljs-string">"Http://www.fengziy.cn"</span>, <span class="hljs-string">"fengziy@aliyun.com"</span>)).build();</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="24"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    }</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="25"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">}</div></div></li></ol></code><div class="hljs-button signin" data-title="登录后复制"></div></pre>
                     </div>
					<h3>&nbsp;</h3>

					<h3><a name="t4"></a>3、配置静态资源路径映射</h3>
                     <div class="blockquote">
					<pre class="has" name="code" onclick="hljs.signin(event)"><code class="hljs java"><ol class="hljs-ln" style="width:1035px"><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-meta">@Configuration</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-meta">@EnableWebMvc</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WebMvcConfig</span> <span class="hljs-keyword">implements</span> <span class="hljs-title">WebMvcConfigurer</span> </span>{</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"> </div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="5"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-meta">@Override</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="6"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">addResourceHandlers</span><span class="hljs-params">(ResourceHandlerRegistry registry)</span> </span>{</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="7"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        registry.addResourceHandler(<span class="hljs-string">"swagger-ui.html"</span>).addResourceLocations(<span class="hljs-string">"classpath:/META-INF/resources/"</span>);</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="8"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        registry.addResourceHandler(<span class="hljs-string">"/webjars/**"</span>).addResourceLocations(<span class="hljs-string">"classpath:/META-INF/resources/webjars/"</span>);</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="9"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    }</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="10"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">}</div></div></li></ol></code><div class="hljs-button signin" data-title="登录后复制"></div></pre>
                     </div>
					<h3>&nbsp;</h3>

					<h3><a name="t6"></a>4、管理RESTful接口</h3>
                    <div class="blockquote">
					<pre class="has" name="code" onclick="hljs.signin(event)"><code class="hljs kotlin"><ol class="hljs-ln"><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-meta">@Api(tags = { <span class="hljs-meta-string">"测试接口"</span> })</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-meta">@RestController</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TestController</span> </span>{</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"> </div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="5"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-meta">@ApiOperation(value = <span class="hljs-meta-string">"查询接口"</span>)</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="6"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-meta">@GetMapping(<span class="hljs-meta-string">"/test/{id}"</span>)</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="7"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-keyword">public</span> AjaxResult find(Integer id) {</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="8"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span>查询</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="9"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-keyword">return</span> AjaxResult.success(<span class="hljs-string">"查询结果"</span>);</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="10"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    }</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="11"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"> </div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="12"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-meta">@ApiOperation(value = <span class="hljs-meta-string">"增加接口"</span>)</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="13"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-meta">@PostMapping(<span class="hljs-meta-string">"/test"</span>)</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="14"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-keyword">public</span> AjaxResult add(Object test) {</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="15"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span>增加</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="16"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-keyword">return</span> AjaxResult.success(<span class="hljs-string">"添加成功"</span>);</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="17"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    }</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="18"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"> </div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="19"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-meta">@ApiOperation(value = <span class="hljs-meta-string">"删除接口"</span>)</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="20"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-meta">@DeleteMapping(<span class="hljs-meta-string">"/test/{id}"</span>)</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="21"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-keyword">public</span> AjaxResult delete(Integer id) {</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="22"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span>删除</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="23"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-keyword">return</span> AjaxResult.success(<span class="hljs-string">"删除成功"</span>);</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="24"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    }</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="25"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"> </div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="26"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-meta">@ApiOperation(value = <span class="hljs-meta-string">"修改接口"</span>)</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="27"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-meta">@PutMapping(<span class="hljs-meta-string">"/text"</span>)</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="28"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-keyword">public</span> AjaxResult update(Integer id) {</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="29"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span>修改</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="30"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-keyword">return</span> AjaxResult.success(<span class="hljs-string">"修改成功"</span>);</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="31"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    }</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="32"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">}</div></div></li></ol></code><div class="hljs-button signin" data-title="登录后复制"></div></pre>
                    </div>
					<h3>&nbsp;</h3>
					<h3><a name="t8"></a>5、查看生成的api文档</h3>
					<p>&nbsp;</p>
					<h3><a name="t9"></a>&nbsp;6、调试接口</h3>
					<p>&nbsp;</p>

					<p>&nbsp;</p>

					<p>总结：是不是很简单，这里只是简单的展示了方法，它还有更多的注解来描述接口、参数、返回值 。需要学习更多的可以到官网阅读文档。</p>

					<p>希望对大家有所微薄的帮助。</p>

					<p>&nbsp;</p>

					<p><span style="color:#3399ea;"><em>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; 向上的路并不拥挤，到多数人选择了安逸！--it疯子也</em></span></p> -->
				</div>
				<div id="statement">
					<div class="item"></div>
					<div class="item">
						<a href="https://www.fengziy.cn/">https://www.fengziy.cn/</a>
					</div>
					<div class="item">本博客所有文章除特别声明外,转载请注明出处!</div>
				</div>
                <div class="comments">
                    <div class="title">评论区</div>
                    <comments :essayId="$route.params.id" :reply="EssayOne.reply"></comments>
                </div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment"
import Comments from "../../components/comments/comments.vue"
export default {
    name: "artile",
    data() {
        return {};
    },
    created() {},
    beforeMount() {},
    mounted() {},
    asyncData({ app, router, store }) {
        return Promise.all([
            store.dispatch("fetchEssayFindOne", app.$route.params.id)
        ])
    },
    computed: {
       ...mapState([
           "EssayOne"
       ])
    },
    filters: {
        dateFrm(date) {
            return moment(date).format("YYYY-MM-DD")
        }
    },
    methods: {
        
    },

    components: {
       Comments
    }
};
</script>

<style lang="stylus" scoped>
#artcle-info 
    padding: 20px
    /* background-image: url(../assets/vue.jpg) */
    margin-bottom: 40px
    .abstract 
        color: #ffffff
        border-left: 3px solid #F56C6C
        padding: 10px
        background-color: rgba(126, 129, 135, 0.3)

    .timeAndView 
        padding: 20px
        line-height: 30px
        font-size: 16px
        color: #000
#artcle-content
    .blockquote
        background-color: #f5f2f0
        padding: 1em
        margin: 2em 2em
        font-family: Consolas,Monaco,"Andale Mono",monospace
        border-radius: 1em
        border-width: .2em
        border-color: #e0dfcc
        border-style: solid
        text-shadow: 0 1px white
        .has 
            background: #f5f2f0
            color: black
            text-shadow: 0 1px white
            font-family: monospace,Consolas,Monaco,"Andale Mono"
            direction: ltr
            text-align: left
            white-space: pre
            word-spacing: normal
            font-size: 1.2em
            tab-size: 4
            hyphens: none
            padding: 0em 0em .5em 0em
            // overflow: auto
            font-size: 14px

    img
        width: 100%

#statement 
    border-left: 3px solid #F56C6C
    padding: 20px
    background-color: #EBEEF5
.comments
    padding 40px 0
    .title
        font-size 18px
        font-weight 800
        border-bottom 1px solid #ddd
        padding-bottom: 10px 
</style>