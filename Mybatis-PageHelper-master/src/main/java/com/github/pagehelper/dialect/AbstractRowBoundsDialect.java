/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2017 abel533@gmail.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

package com.github.pagehelper.dialect;

import com.github.pagehelper.Dialect;
import com.github.pagehelper.PageRowBounds;
import com.github.pagehelper.dialect.AbstractDialect;
import com.github.pagehelper.parser.CountSqlParser;
import org.apache.ibatis.cache.CacheKey;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.session.RowBounds;

import java.util.List;
import java.util.Properties;

/**
 * 基于 RowBounds 的分页
 *
 * @author xander
 */
public abstract class AbstractRowBoundsDialect extends AbstractDialect {

    public boolean skip(MappedStatement ms, Object parameterObject, RowBounds rowBounds) {
        return rowBounds == RowBounds.DEFAULT;
    }

    public boolean beforeCount(MappedStatement ms, Object parameterObject, RowBounds rowBounds) {
        return rowBounds instanceof PageRowBounds;
    }

    public boolean afterCount(long count, Object parameterObject, RowBounds rowBounds) {
        //由于 beforeCount 校验，这里一定是 PageRowBounds
        ((PageRowBounds) rowBounds).setTotal(count);
        return count > 0;
    }

    public Object processParameterObject(MappedStatement ms, Object parameterObject, BoundSql boundSql, CacheKey pageKey) {
        return parameterObject;
    }

    public boolean beforePage(MappedStatement ms, Object parameterObject, RowBounds rowBounds) {
        return true;
    }

    public String getPageSql(MappedStatement ms, BoundSql boundSql, Object parameterObject, RowBounds rowBounds, CacheKey pageKey) {
        String sql = boundSql.getSql();
        return getPageSql(sql, rowBounds, pageKey);
    }

    public abstract String getPageSql(String sql, RowBounds rowBounds, CacheKey pageKey);

    public Object afterPage(List pageList, Object parameterObject, RowBounds rowBounds) {
        return pageList;
    }

    public void afterAll() {

    }

    public void setProperties(Properties properties) {

    }
}
